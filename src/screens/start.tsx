import { Host, Picker } from '@expo/ui';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/brand-mark';
import { LANGUAGES, isLanguageCode } from '@/i18n/languages';
import type { Scenario } from '@/scenario/types';
import { useSettings, type Speed } from '@/settings';
import { colors, radius, spacing, type } from '@/theme';

const machineName = (m: string) => (m === 'ATM' ? 'the ATM' : `the ${m.toLowerCase()}`);

function Row({ icon, label, children }: { icon: Parameters<typeof SymbolView>[0]['name']; label: string; children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 52, paddingHorizontal: 16 }}>
      <SymbolView name={icon} size={20} tintColor={colors.brand} />
      <Text style={[type.headline, { flex: 1, fontWeight: '500' }]}>{label}</Text>
      <Host matchContents>{children}</Host>
    </View>
  );
}

/** What opens when someone scans the "Need help? Scan me" sticker on a machine: one screen, one button. */
export function Start({ scenario }: { scenario: Scenario }) {
  const insets = useSafeAreaInsets();
  const { language, setLanguage, speed, setSpeed } = useSettings();

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper, paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md, paddingHorizontal: spacing.lg }}>
      <View
        style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: colors.brandSoft }}
        accessibilityLabel={`Opened from the sticker on ${machineName(scenario.machine)}`}>
        <SymbolView name="qrcode" size={15} tintColor={colors.brand} />
        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.brand }}>Opened from the sticker on {machineName(scenario.machine)}</Text>
      </View>

      <View style={{ marginTop: 44, width: 76, height: 76, borderRadius: 20, borderCurve: 'continuous', backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
        <BrandMark size={46} color={colors.onBrand} />
      </View>
      <Text testID="start-title" accessibilityRole="header" style={{ marginTop: 28, fontSize: 38, lineHeight: 42, fontWeight: '700', letterSpacing: -1, color: colors.ink }}>
        Point your phone at {machineName(scenario.machine)}.
      </Text>
      <Text style={[type.body, { marginTop: 12, fontSize: 19, lineHeight: 26 }]}>I’ll tell you one step at a time, as slowly as you like.</Text>

      <View style={{ flex: 1 }} />

      <View style={{ borderRadius: radius.card, borderCurve: 'continuous', backgroundColor: colors.sheet }}>
        <Row icon="globe" label="Speaking">
          <Picker<string> selectedValue={language} onValueChange={(v) => isLanguageCode(v) && setLanguage(v)}>
            {LANGUAGES.map((l) => (
              <Picker.Item key={l.code} label={l.native} value={l.code} />
            ))}
          </Picker>
        </Row>
        <View style={{ height: 1, marginLeft: 48, backgroundColor: colors.line }} />
        <Row icon="tortoise.fill" label="Voice speed">
          <Picker<string> selectedValue={speed} onValueChange={(v) => setSpeed(v as Speed)}>
            <Picker.Item label="Slow" value="slow" />
            <Picker.Item label="Normal" value="normal" />
          </Picker>
        </Row>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginTop: 20, marginBottom: 20, paddingHorizontal: 4 }}>
        <SymbolView name="lock.shield.fill" size={20} tintColor={colors.go} />
        <Text style={[type.subhead, { flex: 1, color: colors.ink2 }]}>I never look at your PIN. The camera switches off when a machine asks for it.</Text>
      </View>

      <Pressable
        testID="start-button"
        accessibilityRole="button"
        accessibilityHint="Opens the camera and starts guiding you"
        onPress={() => router.replace({ pathname: '/guide/[id]', params: { id: scenario.id } })}
        style={({ pressed }) => ({
          height: 68,
          borderRadius: 34,
          backgroundColor: colors.brand,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}>
        <SymbolView name="camera.viewfinder" size={24} tintColor={colors.onBrand} />
        <Text style={{ color: colors.onBrand, fontSize: 21, fontWeight: '700' }}>Start</Text>
      </Pressable>
    </View>
  );
}
