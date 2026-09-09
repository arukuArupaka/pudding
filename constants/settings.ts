export type AppSettings = {
  notificationsEnabled: boolean;
  showCompletedTasks: boolean;
  showExpiredTasks: boolean;
};

export const defaultAppSettings: AppSettings = {
  notificationsEnabled: true,
  showCompletedTasks: true,
  showExpiredTasks: false,
};
