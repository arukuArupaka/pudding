import { Platform } from 'react-native';

import { addDays, parseDateKey, type Task } from '../constants/tasks';

const TASK_REMINDER_KIND = 'task-deadline-reminder';
const TASK_REMINDER_CHANNEL_ID = 'task-reminders';
const REMINDER_HOUR = 9;
const REMINDER_MINUTE = 0;

// 通知テスト用。テスト時はtrue,本番では false にする。
const TEST_NOTIFICATION = false;

let notificationHandlerConfigured = false;

async function getNotificationsModule() {
  if (Platform.OS === 'web') {
    return null;
  }

  return import('expo-notifications');
}

function getReminderDate(dueDateKey: string) {
  if (TEST_NOTIFICATION) {
    return new Date(Date.now() + 2 * 60 * 1000);
  }

  const reminderDate = addDays(parseDateKey(dueDateKey), -1);
  reminderDate.setHours(REMINDER_HOUR, REMINDER_MINUTE, 0, 0);
  return reminderDate;
}


async function ensureNotificationPermissions() {
  const Notifications = await getNotificationsModule();

  if (!Notifications) {
    return null;
  }

  if (!notificationHandlerConfigured) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
    notificationHandlerConfigured = true;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(TASK_REMINDER_CHANNEL_ID, {
      name: '課題リマインダー',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const existingPermission = await Notifications.getPermissionsAsync();
  let finalStatus = existingPermission.status;

  if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
    const requestedPermission = await Notifications.requestPermissionsAsync();
    finalStatus = requestedPermission.status;
  }

  return finalStatus === Notifications.PermissionStatus.GRANTED
    ? Notifications
    : null;
}

export async function syncTaskDeadlineNotifications(tasks: Task[]) {
  const pendingTasks = tasks.filter((task) => {
    if (task.completed || !task.dueDateKey) {
      return false;
    }

    return getReminderDate(task.dueDateKey).getTime() > Date.now();
  });

  const Notifications =
    pendingTasks.length > 0
      ? await ensureNotificationPermissions()
      : await getNotificationsModule();

  if (!Notifications) {
    return;
  }

  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  await Promise.all(
    scheduledNotifications
      .filter(
        (notification) =>
          notification.content.data?.kind === TASK_REMINDER_KIND
      )
      .map((notification) =>
        Notifications.cancelScheduledNotificationAsync(notification.identifier)
      )
  );

  await Promise.all(
    pendingTasks.map((task) => {
      const reminderDate = getReminderDate(task.dueDateKey!);

      return Notifications.scheduleNotificationAsync({
        content: {
          title: '明日が締め切りの課題があります',
          body: `${task.title} の締め切りは明日です。`,
          data: {
            kind: TASK_REMINDER_KIND,
            taskId: task.id,
            url: '/tasks',
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: reminderDate,
          channelId: TASK_REMINDER_CHANNEL_ID,
        },
      });
    })
  );
}
