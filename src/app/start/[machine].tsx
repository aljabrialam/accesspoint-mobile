import { Redirect, useLocalSearchParams } from 'expo-router';

import { getScenario } from '@/scenario/scenarios';
import { Start } from '@/screens/start';

/** Deep link printed as a QR code on the machine's sticker, e.g. accesspoint://start/atm */
export default function StartRoute() {
  const { machine } = useLocalSearchParams<{ machine: string }>();
  const scenario = getScenario(machine);
  if (!scenario) return <Redirect href="/" />;
  return <Start scenario={scenario} />;
}
