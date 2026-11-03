import type { LanguageCode } from '@/i18n/languages';

export type Intent = 'repeat' | 'done' | 'yes' | 'no';

/**
 * Spoken command vocabulary per language. The first phrase is the one suggested on screen.
 * The same lists are sent to Muse Voice as vocabulary bias in live mode.
 */
export const COMMANDS: Record<LanguageCode, Record<Intent, string[]>> = {
  en: { repeat: ['repeat', 'again', 'say again'], done: ['done', 'next', 'okay', 'ok', 'finished'], yes: ['yes', 'yeah', 'yep'], no: ['no', 'no thanks', 'nope'] },
  zh: { repeat: ['再说一遍', '重复'], done: ['好了', '下一步', '完成'], yes: ['是', '对', '好的'], no: ['不', '不用了'] },
  hi: { repeat: ['फिर से', 'दोबारा'], done: ['हो गया', 'आगे', 'ठीक है'], yes: ['हाँ', 'जी हाँ'], no: ['नहीं', 'नहीं धन्यवाद'] },
  es: { repeat: ['repite', 'otra vez'], done: ['listo', 'siguiente', 'ya está'], yes: ['sí', 'vale'], no: ['no', 'no gracias'] },
  ar: { repeat: ['أعد', 'مرة أخرى'], done: ['تم', 'التالي', 'حسنًا'], yes: ['نعم', 'أجل'], no: ['لا', 'لا شكرًا'] },
  bn: { repeat: ['আবার বলুন', 'আবার'], done: ['হয়েছে', 'পরের', 'ঠিক আছে'], yes: ['হ্যাঁ'], no: ['না', 'না ধন্যবাদ'] },
  pt: { repeat: ['repete', 'de novo'], done: ['pronto', 'próximo', 'ok'], yes: ['sim'], no: ['não', 'não obrigado'] },
  fr: { repeat: ['répète', 'encore'], done: ['c’est fait', 'suivant', 'ok'], yes: ['oui'], no: ['non', 'non merci'] },
  id: { repeat: ['ulangi', 'sekali lagi'], done: ['sudah', 'lanjut', 'oke'], yes: ['ya', 'iya'], no: ['tidak', 'tidak usah'] },
  ms: { repeat: ['ulang', 'sekali lagi'], done: ['dah siap', 'seterusnya', 'okey'], yes: ['ya'], no: ['tidak', 'tak apa'] },
  fil: { repeat: ['ulitin', 'isa pa'], done: ['tapos na', 'sunod', 'sige'], yes: ['oo', 'opo'], no: ['hindi', 'huwag na'] },
  ja: { repeat: ['もう一度', '繰り返して'], done: ['できた', '次', 'オーケー'], yes: ['はい'], no: ['いいえ', '結構です'] },
  ko: { repeat: ['다시', '한 번 더'], done: ['됐어요', '다음', '완료'], yes: ['네', '예'], no: ['아니요', '괜찮아요'] },
  vi: { repeat: ['nhắc lại', 'lần nữa'], done: ['xong rồi', 'tiếp', 'được'], yes: ['có', 'vâng'], no: ['không', 'thôi'] },
  th: { repeat: ['พูดอีกครั้ง', 'อีกที'], done: ['เสร็จแล้ว', 'ต่อไป', 'โอเค'], yes: ['ใช่', 'ค่ะ', 'ครับ'], no: ['ไม่', 'ไม่เป็นไร'] },
  ta: { repeat: ['மீண்டும்', 'திரும்பச் சொல்'], done: ['முடிந்தது', 'அடுத்து', 'சரி'], yes: ['ஆம்'], no: ['இல்லை', 'வேண்டாம்'] },
  te: { repeat: ['మళ్ళీ', 'మరోసారి'], done: ['అయిపోయింది', 'తర్వాత', 'సరే'], yes: ['అవును'], no: ['వద్దు', 'లేదు'] },
  mr: { repeat: ['पुन्हा', 'परत सांगा'], done: ['झाले', 'पुढे', 'ठीक आहे'], yes: ['हो'], no: ['नाही', 'नको'] },
  kn: { repeat: ['ಮತ್ತೆ ಹೇಳಿ', 'ಮತ್ತೊಮ್ಮೆ'], done: ['ಆಯಿತು', 'ಮುಂದೆ', 'ಸರಿ'], yes: ['ಹೌದು'], no: ['ಇಲ್ಲ', 'ಬೇಡ'] },
  tr: { repeat: ['tekrarla', 'bir daha'], done: ['tamam', 'sonraki', 'oldu'], yes: ['evet'], no: ['hayır', 'gerek yok'] },
  de: { repeat: ['wiederholen', 'nochmal'], done: ['fertig', 'weiter', 'okay'], yes: ['ja'], no: ['nein', 'nein danke'] },
  it: { repeat: ['ripeti', 'di nuovo'], done: ['fatto', 'avanti', 'ok'], yes: ['sì'], no: ['no', 'no grazie'] },
  nl: { repeat: ['herhaal', 'nog een keer'], done: ['klaar', 'volgende', 'oké'], yes: ['ja'], no: ['nee', 'nee dank je'] },
  pl: { repeat: ['powtórz', 'jeszcze raz'], done: ['gotowe', 'dalej', 'okej'], yes: ['tak'], no: ['nie', 'nie dziękuję'] },
  he: { repeat: ['שוב', 'תחזור'], done: ['סיימתי', 'הבא', 'בסדר'], yes: ['כן'], no: ['לא', 'לא תודה'] },
};
