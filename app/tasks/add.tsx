import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Screen } from '../../components/Screen';
import {
  colors,
  controls,
  radii,
  shadows,
  spacing,
  typography,
} from '../../constants/colors';
import { formatCalendarDate, startOfDay } from '../../constants/tasks';
import { useTasks } from '../../lib/tasks';

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

function addDays(date: Date, days: number) {
  const nextDate = startOfDay(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();

  return [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from(
      { length: dayCount },
      (_, index) => new Date(year, month, index + 1)
    ),
  ];
}

function formatMonth(date: Date) {
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
}

function isSameDate(firstDate: Date | null, secondDate: Date | null) {
  if (!firstDate || !secondDate) {
    return false;
  }

  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [error, setError] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(getMonthStart(today));

  const quickOptions = useMemo(
    () => [
      { label: '今日', date: today },
      { label: '明日', date: addDays(today, 1) },
      { label: '1週間後', date: addDays(today, 7) },
    ],
    [today]
  );

  const monthDays = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);

  const selectDate = (date: Date) => {
    setDueDate(startOfDay(date));
    setError('');
    setCalendarVisible(false);
  };

  const moveMonth = (amount: number) => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + amount, 1)
    );
  };

  const handleAddTask = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('課題名を入力してください');
      return;
    }

    if (!dueDate) {
      setError('期限を選択してください');
      return;
    }

    addTask({
      title: trimmedTitle,
      dueDate,
    });
    router.push('/calendar');
  };

  return (
    <Screen title="課題追加">
      <View style={styles.formCard}>
        <View style={styles.field}>
          <Text style={styles.label}>課題名</Text>
          <TextInput
            onChangeText={(value) => {
              setTitle(value);
              setError('');
            }}
            placeholder="例: 国語の作文"
            placeholderTextColor={colors.subtleText}
            style={styles.input}
            value={title}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>期限</Text>
          <View style={styles.dateRow}>
            <TextInput
              editable={false}
              placeholder="日付を選択"
              placeholderTextColor={colors.subtleText}
              style={[styles.input, styles.dateInput]}
              value={dueDate ? formatCalendarDate(dueDate) : ''}
            />
            <Pressable
              accessibilityLabel="期限を選択"
              onPress={() => setCalendarVisible(true)}
              style={({ pressed }) =>
                StyleSheet.flatten([
                  styles.calendarButton,
                  pressed && styles.pressed,
                ])
              }
            >
              <MaterialIcons
                color={colors.actionText}
                name="calendar-today"
                size={24}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable
        onPress={handleAddTask}
        style={({ pressed }) =>
          StyleSheet.flatten([styles.button, pressed && styles.pressed])
        }
      >
        <Text style={styles.buttonText}>追加する</Text>
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        animationType="fade"
        onRequestClose={() => setCalendarVisible(false)}
        transparent
        visible={calendarVisible}
      >
        <View style={styles.modalRoot}>
          <Pressable
            accessibilityLabel="日付選択を閉じる"
            onPress={() => setCalendarVisible(false)}
            style={styles.modalBackdrop}
          />

          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>期限を選択</Text>
              <Pressable
                accessibilityLabel="日付選択を閉じる"
                onPress={() => setCalendarVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons color={colors.mutedText} name="close" size={22} />
              </Pressable>
            </View>

            <View style={styles.quickOptions}>
              {quickOptions.map((option) => {
                const active = isSameDate(dueDate, option.date);

                return (
                  <Pressable
                    key={option.label}
                    onPress={() => selectDate(option.date)}
                    style={[styles.quickOption, active && styles.selectedOption]}
                  >
                    <Text
                      style={[
                        styles.quickOptionText,
                        active && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.monthHeader}>
              <Pressable
                accessibilityLabel="前の月"
                onPress={() => moveMonth(-1)}
                style={styles.monthButton}
              >
                <MaterialIcons
                  color={colors.primary}
                  name="chevron-left"
                  size={24}
                />
              </Pressable>
              <Text style={styles.monthTitle}>{formatMonth(visibleMonth)}</Text>
              <Pressable
                accessibilityLabel="次の月"
                onPress={() => moveMonth(1)}
                style={styles.monthButton}
              >
                <MaterialIcons
                  color={colors.primary}
                  name="chevron-right"
                  size={24}
                />
              </Pressable>
            </View>

            <View style={styles.weekRow}>
              {weekDays.map((weekDay) => (
                <Text key={weekDay} style={styles.weekDay}>
                  {weekDay}
                </Text>
              ))}
            </View>

            <View style={styles.calendarGrid}>
              {monthDays.map((date, index) => {
                const active = isSameDate(dueDate, date);
                const isToday = isSameDate(today, date);

                return (
                  <View
                    key={date?.toISOString() ?? `empty-${index}`}
                    style={styles.dayCell}
                  >
                    {date ? (
                      <Pressable
                        onPress={() => selectDate(date)}
                        style={[
                          styles.dayButton,
                          isToday && styles.todayButton,
                          active && styles.selectedDayButton,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            isToday && styles.todayText,
                            active && styles.selectedDayText,
                          ]}
                        >
                          {date.getDate()}
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.card,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.lg,
    ...shadows.card,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.control,
    borderWidth: 1,
    color: colors.text,
    fontSize: typography.body,
    minHeight: controls.inputHeight,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dateRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dateInput: {
    flex: 1,
  },
  calendarButton: {
    alignItems: 'center',
    backgroundColor: colors.action,
    borderRadius: radii.control,
    height: controls.inputHeight,
    justifyContent: 'center',
    width: 54,
    ...shadows.button,
  },
  button: {
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
  buttonText: {
    color: colors.actionText,
    fontSize: typography.body,
    fontWeight: '800',
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(47, 42, 34, 0.28)',
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: spacing.lg,
    paddingBottom: 30,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    ...shadows.card,
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: colors.text,
    fontSize: typography.sectionTitle,
    fontWeight: '800',
  },
  closeButton: {
    alignItems: 'center',
    height: controls.minTap,
    justifyContent: 'center',
    width: controls.minTap,
  },
  quickOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickOption: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    flex: 1,
    minHeight: controls.minTap,
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: colors.action,
  },
  quickOptionText: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  selectedOptionText: {
    color: colors.actionText,
  },
  monthHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthButton: {
    alignItems: 'center',
    height: controls.minTap,
    justifyContent: 'center',
    width: controls.minTap,
  },
  monthTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
  },
  weekRow: {
    flexDirection: 'row',
  },
  weekDay: {
    color: colors.mutedText,
    flex: 1,
    fontSize: typography.small,
    fontWeight: '800',
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.sm,
  },
  dayCell: {
    alignItems: 'center',
    width: `${100 / 7}%`,
  },
  dayButton: {
    alignItems: 'center',
    borderRadius: radii.pill,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  todayButton: {
    borderColor: colors.border,
    borderWidth: 1,
  },
  selectedDayButton: {
    backgroundColor: colors.action,
    borderColor: colors.action,
    borderWidth: 1,
  },
  dayText: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
  },
  todayText: {
    color: colors.primary,
  },
  selectedDayText: {
    color: colors.actionText,
  },
});
