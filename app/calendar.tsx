import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { colors } from '../constants/colors';

const weekdayLabels = ['日', '月', '火', '水', '木', '金', '土'];

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDateFromOffset(offset: number) {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() + offset);

  return date;
}

function getCalendarDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = getDateFromOffset(index);

    return {
      key: getDateKey(date),
      dateLabel: String(date.getDate()),
      weekday: weekdayLabels[date.getDay()],
      isToday: index === 0,
      isSaturday: date.getDay() === 6,
      isSunday: date.getDay() === 0,
    };
  });
}

const taskTemplates = [
  {
    id: '1',
    title: '数学プリント',
    subject: '数学',
    time: '15:00',
    offset: 0,
  },
  {
    id: '2',
    title: '英語の小テスト',
    subject: '英語',
    time: '16:00',
    offset: 2,
  },
  {
    id: '3',
    title: 'レポート提出',
    subject: '情報',
    time: '17:30',
    offset: 4,
  },
];

export default function CalendarScreen() {
  const calendarDays = useMemo(() => getCalendarDays(), []);
  const tasks = useMemo(
    () =>
      taskTemplates.map((task) => ({
        ...task,
        dateKey: getDateKey(getDateFromOffset(task.offset)),
      })),
    []
  );
  const [selectedDateKey, setSelectedDateKey] = useState(calendarDays[0].key);
  const selectedTasks = tasks.filter((task) => task.dateKey === selectedDateKey);

  return (
    <Screen title="カレンダー" subtitle="今週の予定">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.weekScroller}
        contentContainerStyle={styles.week}
      >
        {calendarDays.map((day) => (
          <Pressable
            key={day.key}
            accessibilityRole="button"
            onPress={() => setSelectedDateKey(day.key)}
            style={[
              styles.day,
              day.isToday && styles.today,
              selectedDateKey === day.key && styles.selectedDay,
            ]}
          >
            <Text
              style={[
                styles.dateText,
                day.isToday && styles.todayText,
                selectedDateKey === day.key && styles.selectedDayText,
              ]}
            >
              {day.isToday ? '今日' : day.dateLabel}
            </Text>
            <Text
              style={[
                styles.dayText,
                day.isSaturday && styles.saturdayText,
                day.isSunday && styles.sundayText,
                day.isToday && styles.todayText,
                selectedDateKey === day.key && styles.selectedDayText,
              ]}
            >
              {day.weekday}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      {selectedTasks.length > 0 ? (
        selectedTasks.map((task) => (
          <View key={task.id} style={styles.card}>
            <Text style={styles.time}>
              {task.subject} {task.time}
            </Text>
            <Text style={styles.title}>{task.title}</Text>
          </View>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>この日の課題はありません</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  week: {
    flexDirection: 'row',
    gap: 8,
  },
  weekScroller: {
    flexGrow: 0,
  },
  day: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    height: 66,
    justifyContent: 'center',
    paddingVertical: 10,
    width: 66,
  },
  today: {
    backgroundColor: '#FFF4B8',
    borderColor: '#E6C94F',
  },
  selectedDay: {
    backgroundColor: '#FFE97A',
    borderColor: '#C6A53A',
  },
  dateText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  dayText: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
  },
  saturdayText: {
    color: '#3478F6',
  },
  sundayText: {
    color: '#E5484D',
  },
  todayText: {
    color: '#6A4E2F',
  },
  selectedDayText: {
    color: '#6A4E2F',
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  time: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  emptyText: {
    color: colors.mutedText,
    fontSize: 15,
    fontWeight: '700',
  },
});
