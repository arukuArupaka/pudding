import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} from '../constants/colors';
import {
  addDays,
  formatCalendarDate,
  getDateKey,
  parseDateKey,
  startOfDay,
} from '../constants/tasks';
import { useTasks } from '../lib/tasks';

const weekdayLabels = ['日', '月', '火', '水', '木', '金', '土'];

function getCalendarDays(today: Date) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index);

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

export default function CalendarScreen() {
  const { settings, tasks } = useTasks();
  const today = useMemo(() => startOfDay(new Date()), []);
  const calendarDays = useMemo(() => getCalendarDays(today), [today]);
  const [selectedDateKey, setSelectedDateKey] = useState(calendarDays[0].key);

  const selectedTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.dueDateKey === selectedDateKey)
        .filter((task) => settings.showCompletedTasks || !task.completed)
        .slice()
        .sort((firstTask, secondTask) =>
          firstTask.title.localeCompare(secondTask.title)
        ),
    [selectedDateKey, settings.showCompletedTasks, tasks]
  );

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
        selectedTasks.map((task) => {
          const date = parseDateKey(task.dueDateKey!);

          return (
            <View key={task.id} style={styles.card}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeText}>
                  {date.getMonth() + 1}/{date.getDate()}
                </Text>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.time}>{formatCalendarDate(date)}</Text>
                <Text
                  style={[styles.title, task.completed && styles.completedTitle]}
                >
                  {task.title}
                </Text>
                <Text style={styles.subject}>{task.subject}</Text>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>この日の課題はありません</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  week: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  weekScroller: {
    flexGrow: 0,
  },
  day: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.control,
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
    fontSize: typography.caption,
    fontWeight: '800',
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
  section: {
    gap: spacing.md,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 76,
    padding: spacing.lg,
    ...shadows.card,
  },
  dateBadge: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.control,
    height: 44,
    justifyContent: 'center',
    width: 50,
  },
  dateBadgeText: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
  },
  time: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  completedTitle: {
    color: colors.mutedText,
    textDecorationLine: 'line-through',
  },
  subject: {
    color: colors.mutedText,
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.card,
    borderWidth: 1,
    padding: spacing.lg,
    ...shadows.card,
  },
  emptyText: {
    color: colors.mutedText,
    flex: 1,
    fontSize: typography.body,
    fontWeight: '700',
    textAlign: 'center',
  },
});
