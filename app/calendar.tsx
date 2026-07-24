import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { colors } from '../constants/colors';

const days = ['月', '火', '水', '木', '金', '土', '日'];

export default function CalendarScreen() {
  return (
    <Screen title="カレンダー" subtitle="今週の予定">
      <View style={styles.week}>
        {days.map((day, index) => (
          <View key={day} style={[styles.day, index === 4 && styles.today]}>
            <Text style={[styles.dayText, index === 4 && styles.todayText]}>
              {day}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.time}>金曜日 16:00</Text>
        <Text style={styles.title}>英語の小テスト</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  week: {
    flexDirection: 'row',
    gap: 8,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 14,
  },
  today: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  dayText: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
  },
  todayText: {
    color: colors.primary,
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
});
