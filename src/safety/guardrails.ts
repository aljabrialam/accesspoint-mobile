/** Guardrails per Meta model. Keep in sync with docs/GUARDRAILS.md. */
export type GuardrailStatus = 'built' | 'live';

export type Guardrail = { title: string; how: string; status: GuardrailStatus };

export type GuardrailGroup = { model: string; job: string; icon: string; rules: Guardrail[] };

export const GUARDRAILS: GuardrailGroup[] = [
  {
    model: 'SAM 3.1',
    job: 'Sees the machine',
    icon: 'viewfinder',
    rules: [
      { title: 'Never sees your PIN', how: 'On PIN screens, frames stop before they are sent.', status: 'built' },
      { title: 'Not sure means not sure', how: 'Low confidence asks for a better angle instead of guessing.', status: 'built' },
      { title: 'Machine parts only', how: 'Looks only for screens, buttons, slots and keypads. Never people or faces.', status: 'live' },
      { title: 'Bystanders stay private', how: 'Faces are blurred on the phone before anything is uploaded.', status: 'live' },
      { title: 'Nothing kept', how: 'Frames are processed in memory and never stored.', status: 'live' },
    ],
  },
  {
    model: 'Muse Spark',
    job: 'Reads the screen, plans one step',
    icon: 'sparkles',
    rules: [
      { title: 'Intent lock', how: 'If the screen does something you did not ask for, AccessPoint stops you.', status: 'built' },
      { title: 'Suggests, never acts', how: 'Its step must point at something the camera really found.', status: 'live' },
      { title: 'Screen text is not an order', how: 'Words on a kiosk screen cannot change what AccessPoint says.', status: 'live' },
      { title: 'No secrets in or out', how: 'Never asks for or repeats a PIN, card number or password.', status: 'live' },
      { title: 'Describes, doesn’t advise', how: 'Explains the screen. No money, medical or legal advice.', status: 'live' },
    ],
  },
  {
    model: 'Muse Voice Transcribe',
    job: 'Hears you, in 25 languages',
    icon: 'waveform',
    rules: [
      { title: 'Words map to buttons in code', how: 'Unclear answers get a question, never a guess.', status: 'built' },
      { title: 'Mic off for PINs', how: 'A PIN said out loud is never transcribed.', status: 'live' },
      { title: 'Small vocabulary', how: 'Listens for the current choices and simple commands only.', status: 'live' },
      { title: 'Transcript only', how: 'Audio is not stored.', status: 'live' },
    ],
  },
];

export const STATUS_LABEL: Record<GuardrailStatus, string> = { built: 'Working now', live: 'Comes with the live camera' };
