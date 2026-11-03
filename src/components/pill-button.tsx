import { Pressable, Text } from 'react-native';

import { colors, radius } from '@/theme';

/** Primary = cobalt with white text (the one thing to do now); secondary = quiet fill. */
export function PillButton({
  label,
  primary,
  onPress,
  flex = 1,
  testID,
}: {
  label: string;
  primary?: boolean;
  onPress: () => void;
  flex?: number;
  testID?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      testID={testID ?? `action-${label}`}
      onPress={onPress}
      style={({ pressed }) => ({
        flex,
        height: 56,
        borderRadius: radius.button,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: primary ? colors.brand : colors.fill,
        opacity: pressed ? 0.8 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}>
      <Text style={{ fontSize: 17, fontWeight: primary ? '700' : '600', color: primary ? colors.onBrand : colors.ink }} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}
