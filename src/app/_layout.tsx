import { Stack } from 'expo-router';

import { SettingsProvider } from '@/settings';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'AccessPoint', headerShown: false }} />
        <Stack.Screen name="safety" options={{ title: 'How we keep you safe', headerLargeTitle: true, headerBackTitle: 'Home' }} />
        <Stack.Screen name="start/[machine]" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
        <Stack.Screen name="guide/[id]" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
      </Stack>
    </SettingsProvider>
  );
}
