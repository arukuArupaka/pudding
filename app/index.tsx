import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { colors } from '../constants/colors';

export default function HomeScreen() {
  return (
    <Screen title="pudding" subtitle="課題と予定をシンプルに整理するアプリ">
      <View style={styles.card}>
        <Text style={styles.cardTitle}>今日やること</Text>
        <Text style={styles.cardText}>数学プリントを提出</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.number}>3</Text>
          <Text style={styles.label}>未完了</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.number}>1</Text>
          <Text style={styles.label}>今日の予定</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
    gap: 8,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  cardText: {
    color: colors.mutedText,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  smallCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  number: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '700',
  },
  label: {
    color: colors.mutedText,
    fontSize: 14,
    marginTop: 4,
  },
});
