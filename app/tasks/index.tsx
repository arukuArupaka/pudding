import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../../components/Screen';
import {
  colors,
  controls,
  radii,
  shadows,
  spacing,
  typography,
} from '../../constants/colors';
import { getDateKey, startOfDay } from '../../constants/tasks';
import { useTasks } from '../../lib/tasks';

export default function TasksScreen() {
  const router = useRouter();
  const { settings, tasks, toggleTask } = useTasks();
  const todayKey = getDateKey(startOfDay(new Date()));
  const visibleTasks = tasks.filter(
    (task) =>
      settings.showExpiredTasks || !task.dueDateKey || task.dueDateKey >= todayKey
  );

  const activeTasks = visibleTasks.filter((task) => !task.completed);
  const allCompletedTasks = visibleTasks.filter((task) => task.completed);
  const completedTasks = settings.showCompletedTasks ? allCompletedTasks : [];
  const completedCount = allCompletedTasks.length;
  const totalCount = visibleTasks.length;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <Screen title="課題一覧">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>課題の完了率</Text>
            <Text style={styles.progressCount}>
              {completedCount} / {totalCount} 件
            </Text>
          </View>

          <Text style={styles.progressNumber}>{progress}%</Text>

          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.progressText}>完了した課題をチェックしよう</Text>
        </View>

        <Pressable
          onPress={() => router.push('/tasks/add')}
          style={({ pressed }) =>
            StyleSheet.flatten([styles.addButton, pressed && styles.pressed])
          }
        >
          <Text style={styles.addText}>＋ 課題を追加</Text>
        </Pressable>

        <View style={styles.section}>
          {activeTasks.length > 0 ? (
            activeTasks.map((task) => (
              <View key={task.id} style={styles.card}>
                <Pressable
                  onPress={() => toggleTask(task.id)}
                  style={styles.checkboxButton}
                >
                  <View style={styles.checkbox} />
                </Pressable>

                <View style={styles.center}>
                  <Text style={styles.title}>{task.title}</Text>
                  <Text style={styles.subject}>{task.subject}</Text>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>締切：{task.due}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.card}>
              <Text style={styles.emptyText}>表示できる課題はありません</Text>
            </View>
          )}
        </View>

        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.completedTitle}>提出済み課題</Text>

            {completedTasks.map((task) => (
              <View key={task.id} style={[styles.card, styles.completedCard]}>
                <Pressable
                  onPress={() => toggleTask(task.id)}
                  style={styles.checkboxButton}
                >
                  <View style={[styles.checkbox, styles.checkedBox]}>
                    <Text style={styles.check}>✓</Text>
                  </View>
                </Pressable>

                <View style={styles.center}>
                  <Text style={[styles.title, styles.completedText]}>
                    {task.title}
                  </Text>
                  <Text style={styles.subject}>{task.subject}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.card,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    ...shadows.card,
  },
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTitle: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '800',
  },
  progressCount: {
    color: colors.mutedText,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  progressNumber: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '800',
  },
  progressBarBackground: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    height: 10,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: colors.action,
    borderRadius: radii.pill,
    height: '100%',
  },
  progressText: {
    color: colors.mutedText,
    fontSize: typography.caption,
    fontWeight: '600',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.action,
    borderRadius: radii.control,
    justifyContent: 'center',
    minHeight: controls.primaryButtonHeight,
    paddingHorizontal: spacing.lg,
    ...shadows.button,
  },
  pressed: {
    ...shadows.pressed,
  },
  addText: {
    color: colors.actionText,
    fontSize: typography.body,
    fontWeight: '800',
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
    minHeight: 72,
    padding: spacing.lg,
    ...shadows.card,
  },
  completedCard: {
    backgroundColor: colors.surfaceMuted,
  },
  checkboxButton: {
    alignItems: 'center',
    height: controls.minTap,
    justifyContent: 'center',
    width: controls.minTap,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 2,
    height: 26,
    justifyContent: 'center',
    width: 26,
  },
  checkedBox: {
    backgroundColor: colors.action,
    borderColor: colors.action,
  },
  check: {
    color: colors.actionText,
    fontSize: typography.body,
    fontWeight: '800',
  },
  center: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '800',
  },
  completedText: {
    color: colors.mutedText,
    textDecorationLine: 'line-through',
  },
  subject: {
    color: colors.mutedText,
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  badge: {
    backgroundColor: colors.warningSoft,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: colors.warning,
    fontSize: typography.small,
    fontWeight: '800',
  },
  completedTitle: {
    color: colors.text,
    fontSize: typography.sectionTitle,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.mutedText,
    flex: 1,
    fontSize: typography.body,
    fontWeight: '700',
    textAlign: 'center',
  },
});
