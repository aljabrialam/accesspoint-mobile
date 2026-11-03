import { FieldGroup, Host, Icon, ListItem, Picker, Text } from '@expo/ui';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, Text as RNText, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { SFSymbol } from 'sf-symbols-typescript';

import { BrandMark } from '@/components/brand-mark';

import { LANGUAGES, isLanguageCode } from '@/i18n/languages';
import { scenarios } from '@/scenario/scenarios';
import { useSettings, type Speed } from '@/settings';
import { colors, radius, spacing, type } from '@/theme';

const openGuide = (id: string) => router.push({ pathname: '/guide/[id]', params: { id } });

const secondary = (text: string) => <Text textStyle={{ fontSize: 15, color: '#6C6C70' }}>{text}</Text>;
const leading = (name: SFSymbol) => <Icon name={name} size={20} color={colors.brand} style={{ width: 28 }} />;

export function Home() {
  const { language, setLanguage, speed, setSpeed } = useSettings();

  return (
    <View style={{ flex: 1, backgroundColor: colors.grouped }}>
      <Hero />
      <Host style={{ flex: 1 }}>
      <FieldGroup>

        <FieldGroup.Section title="Your voice">
          <ListItem
            leading={leading('globe')}
            trailing={
              <Picker<string> selectedValue={language} onValueChange={(v) => isLanguageCode(v) && setLanguage(v)}>
                {LANGUAGES.map((l) => (
                  <Picker.Item key={l.code} label={l.native} value={l.code} />
                ))}
              </Picker>
            }>
            Language
          </ListItem>
          <ListItem
            leading={leading('tortoise.fill')}
            trailing={
              <Picker<string> selectedValue={speed} onValueChange={(v) => setSpeed(v as Speed)}>
                <Picker.Item label="Slow" value="slow" />
                <Picker.Item label="Normal" value="normal" />
              </Picker>
            }>
            Speaking speed
          </ListItem>
          <FieldGroup.SectionFooter>
            <Text>Speak or tap at any step. Voice works in 25 languages, and you can mix them, like Taglish or Singlish.</Text>
          </FieldGroup.SectionFooter>
        </FieldGroup.Section>

        <FieldGroup.Section title="Try it like a stranger would">
          <ListItem
            testID="open-sticker-start"
            onPress={() => router.push({ pathname: '/start/[machine]', params: { machine: 'atm' } })}
            leading={leading('qrcode')}
            supportingText={secondary('What opens when you scan the “Need help? Scan me” sticker on an ATM.')}>
            Start from a machine sticker
          </ListItem>
        </FieldGroup.Section>

        <FieldGroup.Section title="Everyday machines">
          {scenarios
            .filter((s) => s.group === 'everyday')
            .map((s) => (
              <ListItem
                key={s.id}
                testID={`scenario-${s.id}`}
                onPress={() => openGuide(s.id)}
                leading={leading(s.icon as SFSymbol)}
                supportingText={secondary(s.persona)}>
                {s.title}
              </ListItem>
            ))}
        </FieldGroup.Section>

        <FieldGroup.Section title="When something looks wrong">
          {scenarios
            .filter((s) => s.group === 'safety')
            .map((s) => (
              <ListItem
                key={s.id}
                testID={`scenario-${s.id}`}
                onPress={() => openGuide(s.id)}
                leading={leading(s.icon as SFSymbol)}
                supportingText={secondary(s.persona)}>
                {s.title.replace('Safety: ', '')}
              </ListItem>
            ))}
          <FieldGroup.SectionFooter>
            <Text>These are practice scenarios: scripted steps on demo kiosks we built. They don’t use the camera or the models.</Text>
          </FieldGroup.SectionFooter>
        </FieldGroup.Section>

        <FieldGroup.Section title="Privacy">
          <ListItem
            testID="open-safety"
            onPress={() => router.push('/safety')}
            leading={leading('checkmark.shield.fill')}
            supportingText={secondary('What each Meta model may and may not do.')}>
            How AccessPoint keeps you safe
          </ListItem>
          <ListItem leading={leading('lock.fill')} supportingText={secondary('Nothing is sent while you type it.')}>
            The camera pauses on PIN screens
          </ListItem>
          <ListItem leading={leading('hand.tap.fill')} supportingText={secondary('AccessPoint only tells you what to press.')}>
            You press every button yourself
          </ListItem>
        </FieldGroup.Section>
      </FieldGroup>
      </Host>
    </View>
  );
}

function Hero() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingHorizontal: spacing.md, paddingTop: insets.top + spacing.sm, gap: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 4 }} accessibilityRole="header">
        <BrandMark size={30} />
        <RNText style={{ fontSize: 30, fontWeight: '700', letterSpacing: -0.8, color: colors.ink }}>AccessPoint</RNText>
      </View>
      <View style={{ backgroundColor: colors.brand, borderRadius: radius.card + 6, borderCurve: 'continuous', padding: 20, gap: spacing.md }}>
        <RNText style={[type.title, { color: colors.onBrand }]}>Point your phone at a machine</RNText>
        <RNText style={[type.body, { color: 'rgba(255,255,255,0.84)' }]}>I’ll tell you one step at a time, in your language, and check each one happened.</RNText>
        <Pressable
          testID="start-guide"
          accessibilityRole="button"
          onPress={() => openGuide('atm')}
          style={({ pressed }) => ({
            height: 54,
            borderRadius: radius.button,
            backgroundColor: colors.onBrand,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            opacity: pressed ? 0.85 : 1,
          })}>
          <SymbolView name="camera.viewfinder" size={20} tintColor={colors.brand} />
          <RNText style={{ color: colors.brand, fontSize: 17, fontWeight: '700' }}>Start guiding</RNText>
        </Pressable>
      </View>
    </View>
  );
}
