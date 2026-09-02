import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} from '../constants/colors';

export default function HomeScreen() {
  return (
    <Screen title="pudding">
      <View style={styles.highlightCard}>
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
  highlightCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.card,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    ...shadows.card,
  },
  cardTitle: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '800',
  },
  cardText: {
    color: colors.mutedText,
    fontSize: typography.body,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  smallCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.card,
    borderWidth: 1,
    flex: 1,
    minHeight: 88,
    padding: spacing.lg,
    ...shadows.card,
  },
  number: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '800',
  },
  label: {
    color: colors.mutedText,
    fontSize: typography.caption,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
});
