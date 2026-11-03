import { Redirect, useLocalSearchParams } from 'expo-router';

import { isLanguageCode } from '@/i18n/languages';
import { getScenario } from '@/scenario/scenarios';
import { Guide } from '@/screens/guide';

export default function GuideRoute() {
  const { id, lang } = useLocalSearchParams<{ id: string; lang?: string }>();
  const scenario = getScenario(id);
  if (!scenario) return <Redirect href="/" />;
  return <Guide key={scenario.id} scenario={scenario} languageOverride={isLanguageCode(lang) ? lang : undefined} />;
}
