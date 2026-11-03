import type { LanguageCode } from '@/i18n/languages';
import type { Action, Step } from '@/scenario/types';

import { COMMANDS, type Intent } from './commands';

export type VoiceResult = { kind: 'action'; action: Action } | { kind: 'repeat' } | { kind: 'unknown' };

const ALL = Object.keys(COMMANDS) as LanguageCode[];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFC')
    .replace(/[\p{P}\p{S}]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Latin, Cyrillic and similar scripts are matched on whole words; scripts written without spaces are matched as substrings. */
function contains(utterance: string, phrase: string) {
  const p = normalize(phrase);
  if (!p) return false;
  return /[a-zà-ɏ]/.test(p) ? ` ${utterance} `.includes(` ${p} `) : utterance.includes(p);
}

function hasIntent(utterance: string, intent: Intent, langs: LanguageCode[]) {
  return langs.some((l) => COMMANDS[l][intent].some((p) => contains(utterance, p)));
}

/**
 * Deterministic mapping from a transcript to one of the current step's actions.
 * The model only transcribes; this code decides what the words mean, and refuses to guess.
 */
export function matchUtterance(transcript: string, step: Step, langs: LanguageCode[]): VoiceResult {
  const u = normalize(transcript);
  if (!u) return { kind: 'unknown' };

  const byLabel = step.actions.find((a) => contains(u, a.label));
  if (byLabel) return byLabel.next === step.id ? { kind: 'repeat' } : { kind: 'action', action: byLabel };

  if (hasIntent(u, 'repeat', langs)) return { kind: 'repeat' };

  const forward = step.actions.filter((a) => a.next !== step.id);
  const primary = forward.find((a) => a.primary);
  /** A yes/no answer only counts when one of the on-screen choices itself means yes or no. */
  const choiceMeaning = (intent: Intent) => forward.find((a) => !a.primary && hasIntent(normalize(a.label), intent, ALL));

  for (const intent of ['no', 'yes'] as const) {
    if (!hasIntent(u, intent, langs)) continue;
    const choice = choiceMeaning(intent) ?? (intent === 'yes' ? primary : undefined);
    return choice ? { kind: 'action', action: choice } : { kind: 'unknown' };
  }
  if (hasIntent(u, 'done', langs) && primary) return { kind: 'action', action: primary };

  return { kind: 'unknown' };
}

/** Phrases to suggest on screen for this step: the action labels, plus "repeat" in the user's language. */
export function suggestions(step: Step, lang: LanguageCode) {
  const labels = step.actions.filter((a) => a.next !== step.id).map((a) => a.label);
  return [...labels, COMMANDS[lang].repeat[0]];
}
