import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  completed: boolean;
};

const TASKS_KEY = '@pudding_tasks';

export async function getTasks(): Promise<Task[]> {
  try {
    const data =
      await AsyncStorage.getItem(TASKS_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(
      '課題の取得に失敗しました:',
      error
    );

    return [];
  }
}

export async function addTask(
  task: Task
): Promise<void> {
  try {
    const tasks = await getTasks();

    tasks.push(task);

    await AsyncStorage.setItem(
      TASKS_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.error(
      '課題の保存に失敗しました:',
      error
    );

    throw error;
  }
}

export async function updateTasks(
  tasks: Task[]
): Promise<void> {
  await AsyncStorage.setItem(
    TASKS_KEY,
    JSON.stringify(tasks)
  );
}
export async function deleteTask(
  id: string
): Promise<void> {
  const tasks = await getTasks();

  const newTasks = tasks.filter(
    (task) => task.id !== id
  );

  await AsyncStorage.setItem(
    TASKS_KEY,
    JSON.stringify(newTasks)
  );
}
