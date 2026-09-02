import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { Stack, useRouter } from 'expo-router';
import { LogBox } from 'react-native';

import { TasksProvider } from '../lib/tasks';

LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const TASKS_ROUTE = '/tasks';

function isTasksDeepLink(url: string) {
  try {
    const parsedUrl = new URL(url);
    const normalizedPath = parsedUrl.pathname.replace(/^\/--/, '');

    return (
      parsedUrl.protocol === 'pudding:' &&
      (parsedUrl.hostname === 'tasks' || normalizedPath === TASKS_ROUTE)
    );
  } catch {
    return url === 'tasks' || url === TASKS_ROUTE || url.endsWith('/tasks');
  }
}

function WidgetLinkHandler() {
  const router = useRouter();

  useEffect(() => {
    let isActive = true;

    const openTasks = () => {
      router.replace(TASKS_ROUTE);
      Linking.clearInitialURL();
    };

    const handleUrl = (url: string | null) => {
      if (!url || !isTasksDeepLink(url)) {
        return;
      }

      openTasks();
    };

    Linking.getInitialURL().then((url) => {
      if (isActive) {
        handleUrl(url);
      }
    });

    const urlSubscription = Linking.addEventListener('url', ({ url }) => {
      handleUrl(url);
    });

    return () => {
      isActive = false;
      urlSubscription.remove();
    };
  }, [router]);

  return null;
}

export default function RootLayout() {
  return (
    <TasksProvider>
      <WidgetLinkHandler />
      <Stack
        screenOptions={{
          animation: 'none',
          fullScreenGestureEnabled: false,
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </TasksProvider>
  );
}
