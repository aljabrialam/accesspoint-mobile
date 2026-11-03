import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Glass } from '@/components/glass';
import { MachineView } from '@/components/machine-view';
import { languageFromTag, type LanguageCode } from '@/i18n/languages';
import { stepOf, t } from '@/i18n/strings';
import type { Scenario } from '@/scenario/types';
import { useGuide } from '@/scenario/use-guide';
import { SPEECH_RATE, useSettings } from '@/settings';
import { colors } from '@/theme';

import { DoneSheet } from './done-sheet';
import { StepSheet } from './step-sheet';

function CircleButton({
  icon,
  label,
  onPress,
  testID,
}: {
  icon: 'xmark' | 'speaker.wave.2.fill' | 'speaker.slash.fill';
  label: string;
  onPress: () => void;
  testID?: string;
}) {
  return (
    <Pressable testID={testID} accessibilityRole="button" accessibilityLabel={label} onPress={onPress} hitSlop={6}>
      <Glass style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
        <SymbolView name={icon} size={19} weight="semibold" tintColor={colors.ink} />
      </Glass>
    </Pressable>
  );
}

export function Guide({ scenario, languageOverride }: { scenario: Scenario; languageOverride?: LanguageCode }) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const settings = useSettings();
  const lang = languageOverride ?? settings.language;
  const s = t(lang);
  const voiceLanguages = useMemo(
    () => [...new Set<LanguageCode>([lang, languageFromTag(scenario.language), 'en'])],
    [lang, scenario.language],
  );
  const guide = useGuide(scenario, { rate: SPEECH_RATE[settings.speed], voiceLanguages });
  const paused = guide.step.frame?.kind === 'paused' && !guide.finished;

  return (
    <View style={{ flex: 1, backgroundColor: colors.feed }}>
      <StatusBar style="light" />
      <MachineView frame={guide.step.frame} />

      {paused && (
        <View style={{ position: 'absolute', left: 0, right: 0, top: height * 0.2, alignItems: 'center', gap: 12 }}>
          <SymbolView name="video.slash.fill" size={40} tintColor="rgba(255,255,255,0.86)" />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 19, fontWeight: '600' }}>{s.cameraPaused}</Text>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>{s.nothingSent}</Text>
        </View>
      )}

      <View
        style={{
          position: 'absolute',
          top: insets.top + 6,
          left: 16,
          right: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CircleButton testID="guide-close" icon="xmark" label="Close" onPress={() => router.back()} />
        <Glass style={{ height: 52, borderRadius: 26, paddingHorizontal: 22, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: '600', color: colors.ink }}>{scenario.machine}</Text>
          <Text testID="step-counter" style={{ fontSize: 12, color: colors.ink2, fontVariant: ['tabular-nums'] }}>
            {guide.finished ? s.finished : stepOf(lang, guide.stepNumber, guide.stepCount)}
          </Text>
        </Glass>
        <CircleButton
          icon={guide.muted ? 'speaker.slash.fill' : 'speaker.wave.2.fill'}
          label={guide.muted ? 'Turn voice on' : 'Turn voice off'}
          onPress={guide.toggleMute}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: 8,
          maxHeight: height * 0.62,
          borderRadius: 34,
          borderCurve: 'continuous',
          backgroundColor: colors.sheet,
          boxShadow: '0 -4px 24px rgba(0,0,0,0.18)',
        }}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: Math.max(insets.bottom - 4, 18), gap: 14 }}>
          <View style={{ alignSelf: 'center', width: 36, height: 5, borderRadius: 3, backgroundColor: '#D1D1D6' }} />
          {guide.finished ? (
            <DoneSheet result={scenario.result} finishLabel={s.finish} onFinish={() => router.back()} />
          ) : (
            <StepSheet key={guide.step.id} step={guide.step} lang={lang} heard={guide.heard} onAction={guide.choose} onSay={guide.hear} />
          )}
          <Text style={{ textAlign: 'center', fontSize: 13, color: colors.ink3 }}>
            {guide.mode === 'scenario' ? `${s.scenarioNote} ` : ''}
            {s.pinPromise}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}
