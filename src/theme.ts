import type { TextStyle } from 'react-native';

/** AccessPoint brand tokens (see brand/board.html). Cobalt is the brand and every action; amber only marks the target in the camera view. */
export const colors = {
  brand: '#2B47C9',
  brandSoft: 'rgba(43, 71, 201, 0.1)',
  brandMuted: 'rgba(43, 71, 201, 0.32)',
  onBrand: '#FFFFFF',
  signal: '#FFB224',
  signalSoft: 'rgba(255, 178, 36, 0.2)',
  signalInk: '#9A5B00',
  paper: '#F4F6FB',
  grouped: '#F2F2F7',
  sheet: '#FFFFFF',
  ink: '#101828',
  ink2: '#475467',
  ink3: 'rgba(16, 24, 40, 0.45)',
  line: 'rgba(16, 24, 40, 0.08)',
  fill: '#EEF1F7',
  go: '#12805C',
  goSoft: 'rgba(18, 128, 92, 0.12)',
  stop: '#D92D20',
  stopSoft: 'rgba(217, 45, 32, 0.1)',
  feed: '#3B3F45',
  paused: '#161B26',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radius = { sheet: 34, card: 18, button: 28 } as const;

export const type = {
  step: { fontSize: 28, lineHeight: 33, fontWeight: '700', letterSpacing: -0.6, color: colors.ink },
  title: { fontSize: 24, lineHeight: 29, fontWeight: '700', letterSpacing: -0.5, color: colors.ink },
  headline: { fontSize: 17, fontWeight: '600', color: colors.ink },
  body: { fontSize: 17, lineHeight: 23, color: colors.ink2 },
  subhead: { fontSize: 15, lineHeight: 20, color: colors.ink3 },
  caption: { fontSize: 13, color: colors.ink3 },
  micro: { fontSize: 11, color: colors.ink3 },
} as const satisfies Record<string, TextStyle>;
