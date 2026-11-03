import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

const liquid = isLiquidGlassAvailable();

/** Liquid glass on iOS 26+, a frosted light surface elsewhere. */
export function Glass({ style, children }: { style?: StyleProp<ViewStyle>; children?: ReactNode }) {
  if (liquid) {
    return (
      <GlassView glassEffectStyle="regular" isInteractive style={style}>
        {children}
      </GlassView>
    );
  }
  return (
    <View
      style={[
        { backgroundColor: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)' },
        style,
      ]}>
      {children}
    </View>
  );
}
