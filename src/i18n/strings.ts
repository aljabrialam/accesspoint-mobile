import type { LanguageCode } from './languages';

type Strings = {
  stepOf: string;
  finished: string;
  cameraPaused: string;
  nothingSent: string;
  pinPromise: string;
  scenarioNote: string;
  finish: string;
  speak: string;
  trySaying: string;
  heard: string;
  notUnderstood: string;
};

/** App chrome in all 25 languages. Translations are drafts and need native-speaker review before launch. */
const STRINGS: Record<LanguageCode, Strings> = {
  en: { stepOf: 'Step {n} of {m}', finished: 'Finished', cameraPaused: 'Camera paused', nothingSent: 'Nothing is being sent', pinPromise: 'I never see your PIN.', scenarioNote: 'Scenario mode: scripted steps on a demo kiosk.', finish: 'Finish', speak: 'Speak', trySaying: 'Try saying', heard: 'Heard', notUnderstood: 'I didn’t catch that. Try one of these.' },
  zh: { stepOf: '第 {n} 步，共 {m} 步', finished: '已完成', cameraPaused: '摄像头已暂停', nothingSent: '没有发送任何内容', pinPromise: '我永远不会看到你的密码。', scenarioNote: '场景模式：在演示机上播放预设步骤。', finish: '完成', speak: '说话', trySaying: '试着说', heard: '听到', notUnderstood: '我没听清，试试下面这些。' },
  hi: { stepOf: 'चरण {n} / {m}', finished: 'पूरा हुआ', cameraPaused: 'कैमरा रुका हुआ है', nothingSent: 'कुछ भी नहीं भेजा जा रहा', pinPromise: 'मैं आपका PIN कभी नहीं देखता।', scenarioNote: 'सीनारियो मोड: डेमो कियोस्क पर पहले से तय कदम।', finish: 'समाप्त', speak: 'बोलिए', trySaying: 'यह कहकर देखें', heard: 'सुना', notUnderstood: 'मैं समझ नहीं पाया। इनमें से कोई कहें।' },
  es: { stepOf: 'Paso {n} de {m}', finished: 'Terminado', cameraPaused: 'Cámara en pausa', nothingSent: 'No se envía nada', pinPromise: 'Nunca veo tu PIN.', scenarioNote: 'Modo escenario: pasos guionizados en un quiosco de demostración.', finish: 'Terminar', speak: 'Hablar', trySaying: 'Prueba a decir', heard: 'He oído', notUnderstood: 'No te he entendido. Prueba con una de estas.' },
  ar: { stepOf: 'الخطوة {n} من {m}', finished: 'انتهى', cameraPaused: 'الكاميرا متوقفة', nothingSent: 'لا يتم إرسال أي شيء', pinPromise: 'لا أرى رقمك السري أبدًا.', scenarioNote: 'وضع التدريب: خطوات مكتوبة مسبقًا على جهاز تجريبي.', finish: 'إنهاء', speak: 'تحدّث', trySaying: 'جرّب أن تقول', heard: 'سمعت', notUnderstood: 'لم أفهم. جرّب إحدى هذه العبارات.' },
  bn: { stepOf: 'ধাপ {n} / {m}', finished: 'শেষ হয়েছে', cameraPaused: 'ক্যামেরা বন্ধ আছে', nothingSent: 'কিছুই পাঠানো হচ্ছে না', pinPromise: 'আমি কখনো আপনার PIN দেখি না।', scenarioNote: 'অনুশীলন মোড: ডেমো কিয়স্কে আগে থেকে লেখা ধাপ।', finish: 'শেষ করুন', speak: 'বলুন', trySaying: 'বলে দেখুন', heard: 'শুনেছি', notUnderstood: 'বুঝতে পারিনি। এগুলোর একটি বলুন।' },
  pt: { stepOf: 'Passo {n} de {m}', finished: 'Concluído', cameraPaused: 'Câmera pausada', nothingSent: 'Nada está sendo enviado', pinPromise: 'Eu nunca vejo sua senha.', scenarioNote: 'Modo cenário: passos roteirizados em um quiosque de demonstração.', finish: 'Finalizar', speak: 'Falar', trySaying: 'Tente dizer', heard: 'Ouvi', notUnderstood: 'Não entendi. Tente uma destas.' },
  fr: { stepOf: 'Étape {n} sur {m}', finished: 'Terminé', cameraPaused: 'Caméra en pause', nothingSent: 'Rien n’est envoyé', pinPromise: 'Je ne vois jamais votre code.', scenarioNote: 'Mode scénario : étapes préparées sur une borne de démonstration.', finish: 'Terminer', speak: 'Parler', trySaying: 'Essayez de dire', heard: 'Entendu', notUnderstood: 'Je n’ai pas compris. Essayez l’une de ces phrases.' },
  id: { stepOf: 'Langkah {n} dari {m}', finished: 'Selesai', cameraPaused: 'Kamera dijeda', nothingSent: 'Tidak ada yang dikirim', pinPromise: 'Saya tidak pernah melihat PIN Anda.', scenarioNote: 'Mode skenario: langkah tertulis di kios demo.', finish: 'Selesai', speak: 'Bicara', trySaying: 'Coba ucapkan', heard: 'Terdengar', notUnderstood: 'Saya tidak menangkapnya. Coba salah satu ini.' },
  ms: { stepOf: 'Langkah {n} daripada {m}', finished: 'Selesai', cameraPaused: 'Kamera dijeda', nothingSent: 'Tiada apa-apa dihantar', pinPromise: 'Saya tidak pernah melihat PIN anda.', scenarioNote: 'Mod senario: langkah bertulis pada kios demo.', finish: 'Tamat', speak: 'Cakap', trySaying: 'Cuba sebut', heard: 'Didengar', notUnderstood: 'Saya tidak faham. Cuba salah satu ini.' },
  fil: { stepOf: 'Hakbang {n} sa {m}', finished: 'Tapos na', cameraPaused: 'Naka-pause ang camera', nothingSent: 'Walang ipinapadala', pinPromise: 'Hindi ko kailanman nakikita ang PIN mo.', scenarioNote: 'Scenario mode: nakasulat na mga hakbang sa demo na kiosk.', finish: 'Tapusin', speak: 'Magsalita', trySaying: 'Subukang sabihin', heard: 'Narinig', notUnderstood: 'Hindi ko naintindihan. Subukan ang isa sa mga ito.' },
  ja: { stepOf: 'ステップ {n}/{m}', finished: '完了', cameraPaused: 'カメラ一時停止中', nothingSent: '何も送信していません', pinPromise: '暗証番号は見ません。', scenarioNote: 'シナリオモード：デモ端末で用意された手順を再生します。', finish: '終了', speak: '話す', trySaying: 'こう言ってみてください', heard: '聞き取り', notUnderstood: '聞き取れませんでした。次のどれかを言ってください。' },
  ko: { stepOf: '{n}/{m} 단계', finished: '완료', cameraPaused: '카메라 일시 중지됨', nothingSent: '아무것도 전송되지 않아요', pinPromise: '비밀번호는 절대 보지 않아요.', scenarioNote: '시나리오 모드: 데모 키오스크에서 미리 준비한 단계예요.', finish: '끝내기', speak: '말하기', trySaying: '이렇게 말해 보세요', heard: '들은 말', notUnderstood: '잘 못 들었어요. 이 중 하나를 말해 보세요.' },
  vi: { stepOf: 'Bước {n}/{m}', finished: 'Đã xong', cameraPaused: 'Camera đang tạm dừng', nothingSent: 'Không gửi gì cả', pinPromise: 'Tôi không bao giờ nhìn thấy mã PIN của bạn.', scenarioNote: 'Chế độ mô phỏng: các bước soạn sẵn trên ki-ốt demo.', finish: 'Kết thúc', speak: 'Nói', trySaying: 'Thử nói', heard: 'Đã nghe', notUnderstood: 'Tôi chưa nghe rõ. Hãy thử một trong các câu sau.' },
  th: { stepOf: 'ขั้นตอนที่ {n} จาก {m}', finished: 'เสร็จแล้ว', cameraPaused: 'หยุดกล้องชั่วคราว', nothingSent: 'ไม่มีการส่งข้อมูลใดๆ', pinPromise: 'ฉันไม่เคยเห็นรหัส PIN ของคุณ', scenarioNote: 'โหมดจำลอง: ขั้นตอนที่เตรียมไว้บนตู้สาธิต', finish: 'เสร็จสิ้น', speak: 'พูด', trySaying: 'ลองพูดว่า', heard: 'ได้ยิน', notUnderstood: 'ฟังไม่ทัน ลองพูดอย่างใดอย่างหนึ่งนี้' },
  ta: { stepOf: 'படி {n} / {m}', finished: 'முடிந்தது', cameraPaused: 'கேமரா இடைநிறுத்தப்பட்டுள்ளது', nothingSent: 'எதுவும் அனுப்பப்படவில்லை', pinPromise: 'உங்கள் PIN-ஐ நான் ஒருபோதும் பார்ப்பதில்லை.', scenarioNote: 'பயிற்சி முறை: டெமோ கியோஸ்கில் முன்பே எழுதிய படிகள்.', finish: 'முடி', speak: 'பேசுங்கள்', trySaying: 'இப்படிச் சொல்லிப் பாருங்கள்', heard: 'கேட்டது', notUnderstood: 'புரியவில்லை. இவற்றில் ஒன்றைச் சொல்லுங்கள்.' },
  te: { stepOf: 'దశ {n} / {m}', finished: 'పూర్తయింది', cameraPaused: 'కెమెరా ఆపివేయబడింది', nothingSent: 'ఏమీ పంపబడటం లేదు', pinPromise: 'నేను మీ PIN ను ఎప్పుడూ చూడను.', scenarioNote: 'అభ్యాస మోడ్: డెమో కియోస్క్‌పై ముందే రాసిన దశలు.', finish: 'ముగించు', speak: 'మాట్లాడండి', trySaying: 'ఇలా చెప్పి చూడండి', heard: 'విన్నది', notUnderstood: 'అర్థం కాలేదు. వీటిలో ఒకటి చెప్పండి.' },
  mr: { stepOf: 'पायरी {n} / {m}', finished: 'पूर्ण झाले', cameraPaused: 'कॅमेरा थांबवला आहे', nothingSent: 'काहीही पाठवले जात नाही', pinPromise: 'मी तुमचा PIN कधीच पाहत नाही.', scenarioNote: 'सराव मोड: डेमो कियॉस्कवर आधीच लिहिलेल्या पायऱ्या.', finish: 'संपवा', speak: 'बोला', trySaying: 'असे बोलून पाहा', heard: 'ऐकले', notUnderstood: 'समजले नाही. यापैकी एक बोला.' },
  kn: { stepOf: 'ಹಂತ {n} / {m}', finished: 'ಮುಗಿದಿದೆ', cameraPaused: 'ಕ್ಯಾಮೆರಾ ವಿರಾಮದಲ್ಲಿದೆ', nothingSent: 'ಏನನ್ನೂ ಕಳುಹಿಸಲಾಗುತ್ತಿಲ್ಲ', pinPromise: 'ನಾನು ನಿಮ್ಮ PIN ಅನ್ನು ಎಂದಿಗೂ ನೋಡುವುದಿಲ್ಲ.', scenarioNote: 'ಅಭ್ಯಾಸ ಮೋಡ್: ಡೆಮೊ ಕಿಯೋಸ್ಕ್‌ನಲ್ಲಿ ಮೊದಲೇ ಬರೆದ ಹಂತಗಳು.', finish: 'ಮುಗಿಸಿ', speak: 'ಮಾತನಾಡಿ', trySaying: 'ಹೀಗೆ ಹೇಳಿ ನೋಡಿ', heard: 'ಕೇಳಿಸಿತು', notUnderstood: 'ಅರ್ಥವಾಗಲಿಲ್ಲ. ಇವುಗಳಲ್ಲಿ ಒಂದನ್ನು ಹೇಳಿ.' },
  tr: { stepOf: 'Adım {n}/{m}', finished: 'Bitti', cameraPaused: 'Kamera duraklatıldı', nothingSent: 'Hiçbir şey gönderilmiyor', pinPromise: 'PIN’inizi asla görmem.', scenarioNote: 'Senaryo modu: demo kioskta hazırlanmış adımlar.', finish: 'Bitir', speak: 'Konuş', trySaying: 'Şunu söylemeyi dene', heard: 'Duyulan', notUnderstood: 'Anlayamadım. Bunlardan birini dene.' },
  de: { stepOf: 'Schritt {n} von {m}', finished: 'Fertig', cameraPaused: 'Kamera pausiert', nothingSent: 'Es wird nichts gesendet', pinPromise: 'Ich sehe deine PIN nie.', scenarioNote: 'Szenariomodus: vorbereitete Schritte an einem Demo-Automaten.', finish: 'Beenden', speak: 'Sprechen', trySaying: 'Sag zum Beispiel', heard: 'Gehört', notUnderstood: 'Das habe ich nicht verstanden. Versuch eine davon.' },
  it: { stepOf: 'Passo {n} di {m}', finished: 'Finito', cameraPaused: 'Fotocamera in pausa', nothingSent: 'Non viene inviato nulla', pinPromise: 'Non vedo mai il tuo PIN.', scenarioNote: 'Modalità scenario: passaggi preparati su un chiosco dimostrativo.', finish: 'Fine', speak: 'Parla', trySaying: 'Prova a dire', heard: 'Sentito', notUnderstood: 'Non ho capito. Prova una di queste.' },
  nl: { stepOf: 'Stap {n} van {m}', finished: 'Klaar', cameraPaused: 'Camera gepauzeerd', nothingSent: 'Er wordt niets verzonden', pinPromise: 'Ik zie je pincode nooit.', scenarioNote: 'Scenariomodus: vooraf geschreven stappen op een demokiosk.', finish: 'Afronden', speak: 'Spreek', trySaying: 'Zeg bijvoorbeeld', heard: 'Gehoord', notUnderstood: 'Ik verstond het niet. Probeer een van deze.' },
  pl: { stepOf: 'Krok {n} z {m}', finished: 'Gotowe', cameraPaused: 'Kamera wstrzymana', nothingSent: 'Nic nie jest wysyłane', pinPromise: 'Nigdy nie widzę twojego PIN-u.', scenarioNote: 'Tryb scenariusza: przygotowane kroki na kiosku demonstracyjnym.', finish: 'Zakończ', speak: 'Mów', trySaying: 'Spróbuj powiedzieć', heard: 'Usłyszano', notUnderstood: 'Nie zrozumiałem. Spróbuj jednego z tych.' },
  he: { stepOf: 'שלב {n} מתוך {m}', finished: 'הסתיים', cameraPaused: 'המצלמה מושהית', nothingSent: 'שום דבר לא נשלח', pinPromise: 'אני אף פעם לא רואה את הקוד הסודי שלך.', scenarioNote: 'מצב תרגול: שלבים כתובים מראש בעמדת הדגמה.', finish: 'סיום', speak: 'דבר', trySaying: 'נסה לומר', heard: 'שמעתי', notUnderstood: 'לא הבנתי. נסה אחד מאלה.' },
};

export function t(lang: LanguageCode) {
  return STRINGS[lang];
}

export function stepOf(lang: LanguageCode, n: number, m: number) {
  return STRINGS[lang].stepOf.replace('{n}', String(n)).replace('{m}', String(m));
}
