import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  type AddTaskInput,
  formatTaskDueDate,
  getDateKey,
  getTaskProgress,
  initialTasks,
  type Task,
} from '../constants/tasks';
import { updateTaskProgressWidget } from './taskProgressWidget';

type TasksContextValue = {
  addTask: (input: AddTaskInput) => void;
  tasks: Task[];
  toggleTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    updateTaskProgressWidget(getTaskProgress(tasks));
  }, [tasks]);

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
    [tasks]
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
