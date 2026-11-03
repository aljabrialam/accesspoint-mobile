/**
 * The 25 languages Meta validates for Muse Voice Transcribe (dev.meta.ai/docs/speech-to-text).
 * `museName` is the value passed in Muse Voice's `languageBias`; `tts` is the BCP-47 code for spoken output.
 */
export const LANGUAGES = [
  { code: 'en', museName: 'English', native: 'English', tts: 'en-US', rtl: false },
  { code: 'zh', museName: 'Mandarin Chinese', native: '中文（普通话）', tts: 'zh-CN', rtl: false },
  { code: 'hi', museName: 'Hindi', native: 'हिन्दी', tts: 'hi-IN', rtl: false },
  { code: 'es', museName: 'Spanish', native: 'Español', tts: 'es-ES', rtl: false },
  { code: 'ar', museName: 'Arabic', native: 'العربية', tts: 'ar-SA', rtl: true },
  { code: 'bn', museName: 'Bengali', native: 'বাংলা', tts: 'bn-IN', rtl: false },
  { code: 'pt', museName: 'Portuguese', native: 'Português', tts: 'pt-BR', rtl: false },
  { code: 'fr', museName: 'French', native: 'Français', tts: 'fr-FR', rtl: false },
  { code: 'id', museName: 'Indonesian', native: 'Bahasa Indonesia', tts: 'id-ID', rtl: false },
  { code: 'ms', museName: 'Malay', native: 'Bahasa Melayu', tts: 'ms-MY', rtl: false },
  { code: 'fil', museName: 'Tagalog', native: 'Tagalog', tts: 'fil-PH', rtl: false },
  { code: 'ja', museName: 'Japanese', native: '日本語', tts: 'ja-JP', rtl: false },
  { code: 'ko', museName: 'Korean', native: '한국어', tts: 'ko-KR', rtl: false },
  { code: 'vi', museName: 'Vietnamese', native: 'Tiếng Việt', tts: 'vi-VN', rtl: false },
  { code: 'th', museName: 'Thai', native: 'ไทย', tts: 'th-TH', rtl: false },
  { code: 'ta', museName: 'Tamil', native: 'தமிழ்', tts: 'ta-IN', rtl: false },
  { code: 'te', museName: 'Telugu', native: 'తెలుగు', tts: 'te-IN', rtl: false },
  { code: 'mr', museName: 'Marathi', native: 'मराठी', tts: 'mr-IN', rtl: false },
  { code: 'kn', museName: 'Kannada', native: 'ಕನ್ನಡ', tts: 'kn-IN', rtl: false },
  { code: 'tr', museName: 'Turkish', native: 'Türkçe', tts: 'tr-TR', rtl: false },
  { code: 'de', museName: 'German', native: 'Deutsch', tts: 'de-DE', rtl: false },
  { code: 'it', museName: 'Italian', native: 'Italiano', tts: 'it-IT', rtl: false },
  { code: 'nl', museName: 'Dutch', native: 'Nederlands', tts: 'nl-NL', rtl: false },
  { code: 'pl', museName: 'Polish', native: 'Polski', tts: 'pl-PL', rtl: false },
  { code: 'he', museName: 'Hebrew', native: 'עברית', tts: 'he-IL', rtl: true },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code'];

export function getLanguage(code: string) {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export function isLanguageCode(code: unknown): code is LanguageCode {
  return typeof code === 'string' && LANGUAGES.some((l) => l.code === code);
}

/** Maps a scenario's BCP-47 voice tag (e.g. `fil-PH`) to one of our language codes. */
export function languageFromTag(tag: string): LanguageCode {
  const base = tag.split('-')[0];
  return isLanguageCode(base) ? base : 'en';
}
