import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} from '../constants/colors';

export default function SettingsScreen() {
  return (
    <Screen title="設定">
      <View style={styles.item}>
        <Text style={styles.label}>通知</Text>
        <Text style={styles.value}>オン</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>テーマ</Text>
        <Text style={styles.value}>シンプル</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.card,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.card,
  },
  label: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
  },
  value: {
    color: colors.mutedText,
    fontSize: typography.body,
    fontWeight: '600',
  },
});
