import { FINISH, type Action, type Scenario, type Step } from './types';

/**
 * Where guidance comes from. Scenario mode replays scripted steps; the live
 * source (camera + SAM 3.1 + Muse Spark + verifier) implements the same contract.
 */
export interface GuideSource {
  readonly mode: 'scenario' | 'live';
  first(): Step;
  next(current: Step, action: Action): Step | typeof FINISH;
}

export function createScenarioSource(scenario: Scenario): GuideSource {
  const byId = new Map(scenario.steps.map((s) => [s.id, s]));
  return {
    mode: 'scenario',
    first: () => scenario.steps[0],
    next: (_current, action) => (action.next === FINISH ? FINISH : (byId.get(action.next) ?? FINISH)),
  };
}
