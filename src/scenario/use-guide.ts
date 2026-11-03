import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { LanguageCode } from '@/i18n/languages';
import { matchUtterance } from '@/voice/match';
import { speak as speakLine, stopSpeaking } from '@/voice/speaker';

import { createScenarioSource } from './guide-source';
import { FINISH, type Action, type Scenario, type Step, type Tone } from './types';

export type Heard = { text: string; understood: boolean };

function hapticFor(tone: Tone) {
  if (process.env.EXPO_OS !== 'ios') return;
  if (tone === 'stop') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  else if (tone === 'paused') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  else Haptics.selectionAsync();
}

export function useGuide(scenario: Scenario, { rate, voiceLanguages }: { rate: number; voiceLanguages: LanguageCode[] }) {
  const source = useMemo(() => createScenarioSource(scenario), [scenario]);
  const [step, setStep] = useState<Step>(() => source.first());
  const [finished, setFinished] = useState(false);
  const [muted, setMuted] = useState(false);
  const [visits, setVisits] = useState(0);
  const [heard, setHeard] = useState<Heard | null>(null);

  const speak = useCallback(
    (text: string) => {
      if (muted) stopSpeaking();
      else speakLine(text, { language: scenario.language, rate });
    },
    [muted, scenario.language, rate],
  );

  useEffect(() => {
    if (finished) {
      speak(scenario.result.title);
      if (process.env.EXPO_OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }
    speak(step.speech);
    hapticFor(step.tone);
  }, [step, visits, finished, speak, scenario.result.title]);

  useEffect(() => () => stopSpeaking(), []);

  const choose = useCallback(
    (action: Action) => {
      const next = source.next(step, action);
      setHeard(null);
      if (next === FINISH) setFinished(true);
      else if (next.id === step.id) setVisits((v) => v + 1);
      else setStep(next);
    },
    [source, step],
  );

  /** Handles a transcript (from Muse Voice in live mode, or a tapped phrase in scenario mode). */
  const hear = useCallback(
    (transcript: string) => {
      const result = matchUtterance(transcript, step, voiceLanguages);
      if (result.kind === 'action') return choose(result.action);
      if (result.kind === 'repeat') {
        setHeard(null);
        return setVisits((v) => v + 1);
      }
      setHeard({ text: transcript, understood: false });
      if (process.env.EXPO_OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    },
    [step, voiceLanguages, choose],
  );

  const stepIndex = scenario.steps.findIndex((s) => s.id === step.id);

  return {
    mode: source.mode,
    step,
    stepNumber: stepIndex + 1,
    stepCount: scenario.steps.length,
    finished,
    muted,
    toggleMute: () => {
      if (!muted) stopSpeaking();
      setMuted((m) => !m);
    },
    choose,
    hear,
    heard,
  };
}
