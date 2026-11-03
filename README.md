# AccessPoint iPhone app

**Stuck at a machine? Point your phone. Hear the next step.**

The iPhone app for [AccessPoint](https://github.com/aljabrialam/accesspoint), an assistant for older people, blind and low-vision people, and migrants at self-service machines. Built for the Meta Global AI Developer Hackathon 2026.

▶ [Watch the 3-minute demo](https://youtu.be/ae8K5ZCQfSM) · [Main repository](https://github.com/aljabrialam/accesspoint) · [Try the live bot in your browser](https://accesspoint-bot.aljabrialam.workers.dev/try)

## What it shows

The full camera experience in **scenario mode**: scripted steps on demo kiosks we drew, labelled as such on every screen. The live photo pipeline (Muse Spark, SAM 3.1, Muse Voice) runs in the [Messenger, WhatsApp and Telegram bot](https://github.com/aljabrialam/accesspoint/tree/main/bot).

| Scenario | What it demonstrates |
|---|---|
| Airport check-in (Amara) | Opened from a machine sticker; answers by voice; asks instead of guessing |
| Train ticket (Daniel, blind) | Guides a hand to the card slot |
| Clinic kiosk in Japan (Rosa) | Steps in Tagalog for a Japanese screen |
| Food kiosk (Mr Lim) | Reads the menu |
| Self-checkout (Siti) | Steps in Bahasa Indonesia, explains machine errors |
| ATM (Mrs Tan) | PIN mode: camera off, nothing sent |
| Safety: wrong total | S$42.00 for one S$4.20 item: stop, press Cancel |
| Safety: glare | Can't read clearly, so it asks for a better angle |

Plus the sticker start screen, voice in 25 languages, natural spoken guidance, and a "How we keep you safe" screen.

## Run it

```
npm install
npx expo start        # press i for the iOS Simulator (Expo Go)
npm run e2e           # 11 Maestro flows (Metro running, app open in Expo Go)
npm run voice:generate  # regenerate spoken clips after changing scenario text
```

Expo SDK 58, Expo Router, React Native. Project notes: [AGENTS.md](AGENTS.md).

## Licence

MIT. See [LICENSE](LICENSE).
