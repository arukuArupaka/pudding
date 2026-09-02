import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { defaultAppSettings, type AppSettings } from '../constants/settings';
import {
  type AddTaskInput,
  formatTaskDueDate,
  getDateKey,
  getTaskProgress,
  initialTasks,
  type Task,
} from '../constants/tasks';
import { updateTaskProgressWidget } from './taskProgressWidget';

const TASKS_STORAGE_KEY = '@pudding_tasks';
const SETTINGS_STORAGE_KEY = '@pudding_settings';

type KeyValueStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
};

const memoryStore = new Map<string, string>();

const memoryStorage: KeyValueStorage = {
  async getItem(key) {
    return memoryStore.get(key) ?? null;
  },
  async setItem(key, value) {
    memoryStore.set(key, value);
  },
};

type LocalStorageLike = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

type GlobalWithLocalStorage = typeof globalThis & {
  localStorage?: LocalStorageLike;
};

const hasBrowserWindow =
  typeof (globalThis as { window?: unknown }).window !== 'undefined';

const localStorage = hasBrowserWindow
  ? (globalThis as GlobalWithLocalStorage).localStorage
  : undefined;

const webStorage: KeyValueStorage | null = localStorage
  ? {
      async getItem(key) {
        return localStorage.getItem(key);
      },
      async setItem(key, value) {
        localStorage.setItem(key, value);
      },
    }
  : null;

let storagePromise: Promise<KeyValueStorage> | null = null;

async function getStorage() {
  if (webStorage) {
    return webStorage;
  }

  storagePromise ??= import('@react-native-async-storage/async-storage')
    .then(async (module) => {
      const storage = module.default;
      await storage.getItem('@pudding_storage_check');
      return storage;
    })
    .catch(() => memoryStorage);

  return storagePromise;
}

async function getStoredItem(key: string) {
  const storage = await getStorage();
  return storage.getItem(key);
}

async function setStoredItem(key: string, value: string) {
  const storage = await getStorage();
  await storage.setItem(key, value);
}

type TasksContextValue = {
  addTask: (input: AddTaskInput) => void;
  clearTasks: () => void;
  settings: AppSettings;
  setShowCompletedTasks: (value: boolean) => void;
  setShowExpiredTasks: (value: boolean) => void;
  tasks: Task[];
  toggleTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

function normalizeStoredTasks(value: unknown): Task[] {
  if (!Array.isArray(value)) {
    return initialTasks;
  }

  return value
    .map((item): Task | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const task = item as Partial<Task> & {
        deadline?: unknown;
      };

      if (typeof task.id !== 'string' || typeof task.title !== 'string') {
        return null;
      }

      const legacyDue =
        typeof task.deadline === 'string' ? task.deadline : undefined;

      return {
        completed: Boolean(task.completed),
        due: typeof task.due === 'string' ? task.due : legacyDue || '未設定',
        dueDateKey: typeof task.dueDateKey === 'string' ? task.dueDateKey : null,
        id: task.id,
        subject: typeof task.subject === 'string' ? task.subject : '未分類',
        title: task.title,
      };
    })
    .filter((task): task is Task => task !== null);
}

function normalizeStoredSettings(value: unknown): AppSettings {
  if (!value || typeof value !== 'object') {
    return defaultAppSettings;
  }

  const settings = value as Partial<AppSettings>;

  return {
    showCompletedTasks:
      typeof settings.showCompletedTasks === 'boolean'
        ? settings.showCompletedTasks
        : defaultAppSettings.showCompletedTasks,
    showExpiredTasks:
      typeof settings.showExpiredTasks === 'boolean'
        ? settings.showExpiredTasks
        : defaultAppSettings.showExpiredTasks,
  };
}

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState(initialTasks);
  const [settings, setSettings] = useState(defaultAppSettings);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadStoredData() {
      try {
        const [storedTasks, storedSettings] = await Promise.all([
          getStoredItem(TASKS_STORAGE_KEY),
          getStoredItem(SETTINGS_STORAGE_KEY),
        ]);

        if (!isMounted) {
          return;
        }

        if (storedTasks) {
          setTasks(normalizeStoredTasks(JSON.parse(storedTasks)));
        }

        if (storedSettings) {
          setSettings(normalizeStoredSettings(JSON.parse(storedSettings)));
        }
      } catch (error) {
        console.error('保存データの読み込みに失敗しました:', error);
      } finally {
        if (isMounted) {
          setHasLoadedStorage(true);
        }
      }
    }

    loadStoredData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    updateTaskProgressWidget(getTaskProgress(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    setStoredItem(TASKS_STORAGE_KEY, JSON.stringify(tasks)).catch((error) => {
      console.error('課題の保存に失敗しました:', error);
    });
  }, [hasLoadedStorage, tasks]);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    setStoredItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings)).catch(
      (error) => {
        console.error('設定の保存に失敗しました:', error);
      }
    );
  }, [hasLoadedStorage, settings]);

  const value = useMemo<TasksContextValue>(
    () => ({
      addTask: ({ title, subject, dueDate }) => {
        setTasks((currentTasks) => [
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            title,
            subject: subject?.trim() || '未分類',
            due: formatTaskDueDate(dueDate),
            dueDateKey: getDateKey(dueDate),
            completed: false,
          },
          ...currentTasks,
        ]);
      },
      clearTasks: () => {
        setTasks([]);
      },
      settings,
      setShowCompletedTasks: (showCompletedTasks) => {
        setSettings((currentSettings) => ({
          ...currentSettings,
          showCompletedTasks,
        }));
      },
      setShowExpiredTasks: (showExpiredTasks) => {
        setSettings((currentSettings) => ({
          ...currentSettings,
          showExpiredTasks,
        }));
      },
      tasks,
      toggleTask: (id) => {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                }
              : task
          )
        );
      },
    }),
    [settings, tasks]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const value = useContext(TasksContext);

  if (!value) {
    throw new Error('useTasks must be used within TasksProvider');
  }

  return value;
}
