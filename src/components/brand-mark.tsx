import Svg, { Path } from 'react-native-svg';

import { colors } from '@/theme';

// Generated from brand/build_brand.py (the letter A in braille). Do not edit the paths by hand.
const MARK = 'M61.5 58a31.5 31.5 0 1 0 63.0 0a31.5 31.5 0 1 0 -63.0 0ZM133 58a30 30 0 1 0 60 0a30 30 0 1 0 -60 0ZM145 58a18 18 0 1 0 36 0a18 18 0 1 0 -36 0ZM63 128a30 30 0 1 0 60 0a30 30 0 1 0 -60 0ZM75 128a18 18 0 1 0 36 0a18 18 0 1 0 -36 0ZM133 128a30 30 0 1 0 60 0a30 30 0 1 0 -60 0ZM145 128a18 18 0 1 0 36 0a18 18 0 1 0 -36 0ZM63 198a30 30 0 1 0 60 0a30 30 0 1 0 -60 0ZM75 198a18 18 0 1 0 36 0a18 18 0 1 0 -36 0ZM133 198a30 30 0 1 0 60 0a30 30 0 1 0 -60 0ZM145 198a18 18 0 1 0 36 0a18 18 0 1 0 -36 0Z';
const MARK_SMALL = 'M59 58a34 34 0 1 0 68 0a34 34 0 1 0 -68 0ZM146 58a17 17 0 1 0 34 0a17 17 0 1 0 -34 0ZM76 128a17 17 0 1 0 34 0a17 17 0 1 0 -34 0ZM146 128a17 17 0 1 0 34 0a17 17 0 1 0 -34 0ZM76 198a17 17 0 1 0 34 0a17 17 0 1 0 -34 0ZM146 198a17 17 0 1 0 34 0a17 17 0 1 0 -34 0Z';

/** The AccessPoint mark. `small` uses the solid-dot cut meant for sizes under 32 pt. */
export function BrandMark({ size = 32, color = colors.brand, small }: { size?: number; color?: string; small?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="58 22 140 212" accessibilityLabel="AccessPoint">
      <Path d={small ? MARK_SMALL : MARK} fill={color} fillRule="evenodd" />
    </Svg>
  );
}
