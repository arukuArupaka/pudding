import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ animation: 'none' }} />
      <Stack.Screen name="tasks/index" options={{ animation: 'none' }} />
      <Stack.Screen name="tasks/add" options={{ animation: 'none' }} />
      <Stack.Screen name="calendar" options={{ animation: 'none' }} />
      <Stack.Screen name="settings" options={{ animation: 'none' }} />
    </Stack>
  );
}
