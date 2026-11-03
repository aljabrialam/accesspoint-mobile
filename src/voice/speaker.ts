import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import * as Speech from 'expo-speech';

import { VOICE_CLIPS } from './clips.generated';

let player: AudioPlayer | null = null;
let audioModeSet = false;

/**
 * Speaks a line: a pre-generated natural voice clip (ElevenLabs) when one exists for this exact text,
 * otherwise the device's built-in speech. Returns which one played.
 */
export function speak(text: string, { language, rate }: { language: string; rate: number }): 'clip' | 'device' {
  stopSpeaking();
  const clip = VOICE_CLIPS[text];
  if (clip === undefined) {
    Speech.speak(text, { language, rate });
    return 'device';
  }
  if (!audioModeSet) {
    audioModeSet = true;
    void setAudioModeAsync({ playsInSilentMode: true });
  }
  player ??= createAudioPlayer(null);
  player.replace(clip);
  player.setPlaybackRate(rate < 1 ? 0.9 : 1, 'high');
  player.play();
  return 'clip';
}

export function stopSpeaking() {
  void Speech.stop();
  player?.pause();
}
