import { Stack } from 'expo-router';
import { LogBox } from 'react-native';

import { TasksProvider } from '../lib/tasks';

LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack
        screenOptions={{
          animation: 'none',
          headerShown: false,
        }}
      />
    </TasksProvider>
  );
}
