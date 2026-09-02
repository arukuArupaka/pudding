export type AppSettings = {
  showCompletedTasks: boolean;
  showExpiredTasks: boolean;
};

export const defaultAppSettings: AppSettings = {
  showCompletedTasks: true,
  showExpiredTasks: false,
};
