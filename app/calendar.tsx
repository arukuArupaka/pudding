import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import {
  colors,
  controls,
  radii,
  shadows,
  spacing,
  typography,
} from '../constants/colors';
import { formatCalendarDate, parseDateKey, startOfDay } from '../constants/tasks';
import { useTasks } from '../lib/tasks';

const days = ['月', '火', '水', '木', '金', '土', '日'];

export default function CalendarScreen() {
  const { tasks } = useTasks();
  const today = useMemo(() => startOfDay(new Date()), []);
  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

  const scheduledTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.dueDateKey)
        .slice()
        .sort((firstTask, secondTask) =>
          firstTask.dueDateKey!.localeCompare(secondTask.dueDateKey!)
        ),
    [tasks]
  );

  return (
    <Screen title="カレンダー">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.week}>
          {days.map((day, index) => (
            <View
              key={day}
              style={[styles.day, index === todayIndex && styles.today]}
            >
              <Text
                style={[styles.dayText, index === todayIndex && styles.todayText]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          {scheduledTasks.length > 0 ? (
            scheduledTasks.map((task) => {
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
                      style={[
                        styles.title,
                        task.completed && styles.completedTitle,
                      ]}
                    >
                      {task.title}
                    </Text>
                    <Text style={styles.subject}>{task.subject}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.card}>
              <Text style={styles.emptyText}>予定されている課題はありません</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  day: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.control,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: controls.minTap,
  },
  today: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  dayText: {
    color: colors.mutedText,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  todayText: {
    color: colors.primary,
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
  emptyText: {
    color: colors.mutedText,
    flex: 1,
    fontSize: typography.body,
    fontWeight: '700',
    textAlign: 'center',
  },
});
