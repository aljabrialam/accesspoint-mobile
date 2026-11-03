import { createContext, use, useMemo, useState, type ReactNode } from 'react';

import type { LanguageCode } from '@/i18n/languages';

export type Speed = 'slow' | 'normal';
export const SPEECH_RATE: Record<Speed, number> = { slow: 0.82, normal: 1 };

type Settings = {
  language: LanguageCode;
  speed: Speed;
  setLanguage: (l: LanguageCode) => void;
  setSpeed: (s: Speed) => void;
};

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [speed, setSpeed] = useState<Speed>('slow');
  const value = useMemo(() => ({ language, speed, setLanguage, setSpeed }), [language, speed]);
  return <SettingsContext value={value}>{children}</SettingsContext>;
}

export function useSettings() {
  const ctx = use(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
