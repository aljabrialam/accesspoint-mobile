import { SymbolView } from 'expo-symbols';
import { Text, View } from 'react-native';

import { PillButton } from '@/components/pill-button';
import type { Scenario } from '@/scenario/types';
import { colors } from '@/theme';

export function DoneSheet({ result, finishLabel, onFinish }: { result: Scenario['result']; finishLabel: string; onFinish: () => void }) {
  return (
    <View style={{ gap: 18 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.go, alignItems: 'center', justifyContent: 'center' }}>
          <SymbolView name="checkmark" size={22} weight="bold" tintColor="#FFFFFF" />
        </View>
        <Text testID="done-title" style={{ flex: 1, fontSize: 24, lineHeight: 28, fontWeight: '700', letterSpacing: -0.5, color: colors.ink }}>
          {result.title}
        </Text>
      </View>

      <View style={{ borderRadius: 16, borderCurve: 'continuous', backgroundColor: colors.fill, paddingHorizontal: 16 }}>
        {result.rows.map(([label, value], i) => (
          <View
            key={label}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 14,
              borderTopWidth: i === 0 ? 0 : 0.5,
              borderTopColor: 'rgba(60,60,67,0.29)',
            }}>
            <Text style={{ fontSize: 16, color: colors.ink }}>{label}</Text>
            <Text selectable style={{ fontSize: 17, fontWeight: '600', color: colors.ink, fontVariant: ['tabular-nums'] }}>
              {value}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <PillButton label={finishLabel} primary onPress={onFinish} testID="action-Finish" />
      </View>
    </View>
  );
}
