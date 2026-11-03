import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import type { SFSymbol } from 'sf-symbols-typescript';
import { Pressable, Text, View } from 'react-native';

import { PillButton } from '@/components/pill-button';
import type { LanguageCode } from '@/i18n/languages';
import { t } from '@/i18n/strings';
import type { Heard } from '@/scenario/use-guide';
import { PHASES, type Action, type Step, type Tone } from '@/scenario/types';
import { colors, type } from '@/theme';
import { suggestions } from '@/voice/match';

const TONE: Record<Tone, { icon: SFSymbol; tint: string; bg: string }> = {
  normal: { icon: 'waveform', tint: colors.brand, bg: colors.brandSoft },
  ask: { icon: 'questionmark.bubble.fill', tint: colors.brand, bg: colors.brandSoft },
  unsure: { icon: 'eye.trianglebadge.exclamationmark.fill', tint: colors.signalInk, bg: colors.signalSoft },
  stop: { icon: 'hand.raised.fill', tint: colors.stop, bg: colors.stopSoft },
  paused: { icon: 'lock.fill', tint: colors.ink, bg: colors.fill },
  done: { icon: 'checkmark', tint: colors.go, bg: colors.goSoft },
};

function Progress({ phase }: { phase: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }} accessibilityLabel={`Stage ${PHASES[phase]}`}>
      <View style={{ flex: 1, flexDirection: 'row', gap: 4 }}>
        {PHASES.map((p, i) => (
          <View
            key={p}
            style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < phase ? colors.brandMuted : i === phase ? colors.brand : colors.line }}
          />
        ))}
      </View>
      <Text style={[type.micro, { fontWeight: '600', color: colors.ink2, fontVariant: ['tabular-nums'] }]}>{PHASES[phase]}</Text>
    </View>
  );
}

function VoicePanel({ step, lang, heard, onSay }: { step: Step; lang: LanguageCode; heard: Heard | null; onSay: (text: string) => void }) {
  const s = t(lang);
  return (
    <View style={{ gap: 10, padding: 14, borderRadius: 18, borderCurve: 'continuous', backgroundColor: colors.fill }}>
      {heard && !heard.understood && (
        <Text testID="voice-not-understood" style={{ fontSize: 15, color: colors.stop }}>
          {s.heard}: “{heard.text}”. {s.notUnderstood}
        </Text>
      )}
      <Text style={{ fontSize: 13, fontWeight: '600', color: colors.ink2 }}>{s.trySaying}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {suggestions(step, lang).map((phrase, i) => (
          <Pressable
            key={phrase}
            testID={`say-${i}`}
            accessibilityRole="button"
            onPress={() => onSay(phrase)}
            style={({ pressed }) => ({
              paddingHorizontal: 14,
              height: 38,
              borderRadius: 19,
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              opacity: pressed ? 0.7 : 1,
            })}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: colors.ink }}>“{phrase}”</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export function StepSheet({
  step,
  lang,
  heard,
  onAction,
  onSay,
}: {
  step: Step;
  lang: LanguageCode;
  heard: Heard | null;
  onAction: (a: Action) => void;
  onSay: (text: string) => void;
}) {
  const tone = TONE[step.tone];
  const [voiceOpen, setVoiceOpen] = useState(false);
  return (
    <View style={{ gap: 20 }}>
      <Progress phase={step.phase} />

      {step.band && (
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            paddingVertical: 7,
            paddingHorizontal: 12,
            borderRadius: 999,
            backgroundColor: step.tone === 'stop' ? colors.stop : colors.ink,
          }}>
          <SymbolView name={step.tone === 'stop' ? 'xmark.octagon.fill' : 'eye.slash.fill'} size={15} tintColor="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>{step.band}</Text>
        </View>
      )}

      <View style={{ gap: 8 }}>
        <Text testID="step-title" style={type.step}>
          {step.title}
        </Text>
        {step.sub && <Text style={type.body}>{step.sub}</Text>}
        {step.translation && <Text style={type.subhead}>{step.translation}</Text>}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: tone.bg, alignItems: 'center', justifyContent: 'center' }}>
          <SymbolView name={tone.icon} size={20} tintColor={tone.tint} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text testID="step-chip" style={[type.headline, step.tone === 'stop' && { color: colors.stop }]}>
            {step.chip}
          </Text>
          <Text style={[type.caption, { fontSize: 14 }]}>{step.listening}</Text>
        </View>
        <Pressable
          testID="voice-mic"
          accessibilityRole="button"
          accessibilityLabel={t(lang).speak}
          accessibilityState={{ expanded: voiceOpen }}
          onPress={() => setVoiceOpen((o) => !o)}
          hitSlop={6}
          style={({ pressed }) => ({
            width: 52,
            height: 52,
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: voiceOpen ? colors.brandSoft : colors.brand,
            opacity: pressed ? 0.8 : 1,
          })}>
          <SymbolView name={voiceOpen ? 'waveform' : 'mic.fill'} size={22} tintColor={voiceOpen ? colors.brand : colors.onBrand} />
        </Pressable>
      </View>

      {(voiceOpen || (heard && !heard.understood)) && (
        <VoicePanel
          step={step}
          lang={lang}
          heard={heard}
          onSay={(phrase) => {
            setVoiceOpen(false);
            onSay(phrase);
          }}
        />
      )}

      <View style={{ flexDirection: 'row', gap: 10 }}>
        {step.actions.map((a) => (
          <PillButton key={a.label} label={a.label} primary={a.primary} flex={a.primary ? 1.6 : 1} onPress={() => onAction(a)} />
        ))}
      </View>
    </View>
  );
}
