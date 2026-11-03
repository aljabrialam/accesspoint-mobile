export const PHASES = ['See', 'Read', 'Plan', 'Guide', 'Confirm', 'Done'] as const;
export type Phase = 0 | 1 | 2 | 3 | 4 | 5;

export type Tone = 'normal' | 'ask' | 'stop' | 'paused' | 'unsure' | 'done';

export type Box = { x: number; y: number; w: number; h: number };
export type Target = Box & { label: string };
export type ScreenButton = { x: number; w: number; text: string; sub?: string; muted?: boolean; y?: number; h?: number };

export type KioskKind = 'atm' | 'clinic' | 'order' | 'checkout' | 'airport';

export type MachineFrame =
  | {
      kind: KioskKind;
      lines: string[];
      buttons: ScreenButton[];
      target?: Target;
      danger?: Box;
      glare?: boolean;
    }
  | { kind: 'ticket'; lines: string[]; hand?: { x: number; y: number }; target?: Target }
  | { kind: 'paused' };

export type Action = {
  label: string;
  primary?: boolean;
  next: string;
};

export type Step = {
  id: string;
  phase: Phase;
  tone: Tone;
  chip: string;
  band?: string;
  title: string;
  sub?: string;
  translation?: string;
  speech: string;
  listening: string;
  frame?: MachineFrame;
  actions: Action[];
};

export type Scenario = {
  id: string;
  machine: string;
  icon: string;
  group: 'everyday' | 'safety';
  title: string;
  persona: string;
  language: string;
  steps: Step[];
  result: { title: string; rows: [string, string][] };
};

export const FINISH = 'finish';
