export type Task = {
  id: string;
  title: string;
  subject: string;
  due: string;
  dueDateKey: string | null;
  completed: boolean;
};

export type AddTaskInput = {
  title: string;
  subject?: string;
  dueDate: Date;
};

export type TaskProgressSnapshot = {
  completedCount: number;
  totalCount: number;
  progress: number;
};

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number) {
  const nextDate = startOfDay(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatTaskDueDate(date: Date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export function formatCalendarDate(date: Date) {
  return `${date.getMonth() + 1}月${date.getDate()}日 (${
    weekDays[date.getDay()]
  })`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const today = startOfDay(new Date());
const currentYear = today.getFullYear();

export const initialTasks: Task[] = [
  {
    id: '1',
    title: '数学プリント',
    subject: '数学',
    due: '今日',
    dueDateKey: getDateKey(today),
    completed: false,
  },
  {
    id: '2',
    title: '英単語テスト',
    subject: '英語',
    due: '8月1日',
    dueDateKey: getDateKey(new Date(currentYear, 7, 1)),
    completed: false,
  },
  {
    id: '3',
    title: 'レポート提出',
    subject: '情報',
    due: '8月5日',
    dueDateKey: getDateKey(new Date(currentYear, 7, 5)),
    completed: false,
  },
];

export function getTaskProgress(tasks: Task[]): TaskProgressSnapshot {
  const completedCount =
    tasks.filter((task) => task.completed).length;

  const totalCount = tasks.length;

  const progress =
    totalCount === 0
      ? 0
      : Math.round(
          (completedCount / totalCount) *
            100
        );

  return {
    completedCount,
    totalCount,
    progress,
  };
}
