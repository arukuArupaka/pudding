import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import {
  colors,
  controls,
  radii,
  shadows,
  spacing,
  typography,
} from '../constants/colors';
import { useTasks } from '../lib/tasks';

export default function SettingsScreen() {
  const {
    clearTasks,
    setShowCompletedTasks,
    setShowExpiredTasks,
    settings,
    tasks,
  } = useTasks();

  const handleClearTasks = () => {
    Alert.alert(
      '課題をすべて削除しますか？',
      '削除すると元に戻せません。',
      [
        {
          style: 'cancel',
          text: 'キャンセル',
        },
        {
          onPress: clearTasks,
          style: 'destructive',
          text: '削除する',
        },
      ]
    );
  };

  return (
    <Screen title="設定">
      <View style={styles.item}>
        <View style={styles.itemText}>
          <Text style={styles.label}>期限切れ課題を表示</Text>
          <Text style={styles.description}>
            オフにすると、締め切りを過ぎた課題を一覧から隠します
          </Text>
        </View>
        <Switch
          ios_backgroundColor={colors.surfaceMuted}
          onValueChange={setShowExpiredTasks}
          thumbColor={settings.showExpiredTasks ? colors.action : colors.surface}
          trackColor={{
            false: colors.surfaceMuted,
            true: colors.primarySoft,
          }}
          value={settings.showExpiredTasks}
        />
      </View>

      <View style={styles.item}>
        <View style={styles.itemText}>
          <Text style={styles.label}>完了済み課題を表示</Text>
          <Text style={styles.description}>
            オフにすると、提出済みの課題を一覧とカレンダーから隠します
          </Text>
        </View>
        <Switch
          ios_backgroundColor={colors.surfaceMuted}
          onValueChange={setShowCompletedTasks}
          thumbColor={settings.showCompletedTasks ? colors.action : colors.surface}
          trackColor={{
            false: colors.surfaceMuted,
            true: colors.primarySoft,
          }}
          value={settings.showCompletedTasks}
        />
      </View>

      <View style={styles.dangerCard}>
        <View style={styles.itemText}>
          <Text style={styles.label}>全データを削除</Text>
          <Text style={styles.description}>
            保存されている課題 {tasks.length} 件をこの端末から削除します
          </Text>
        </View>
        <Pressable
          onPress={handleClearTasks}
          style={({ pressed }) =>
            StyleSheet.flatten([
              styles.dangerButton,
              pressed && styles.pressed,
              tasks.length === 0 && styles.disabledButton,
            ])
          }
          disabled={tasks.length === 0}
        >
          <Text
            style={[
              styles.dangerButtonText,
              tasks.length === 0 && styles.disabledButtonText,
            ]}
          >
            削除
          </Text>
        </Pressable>
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
  itemText: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0,
    paddingRight: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
  },
  description: {
    color: colors.mutedText,
    fontSize: typography.caption,
    fontWeight: '600',
    lineHeight: 18,
  },
  dangerCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.dangerSoft,
    borderRadius: radii.card,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 72,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.card,
  },
  dangerButton: {
    alignItems: 'center',
    backgroundColor: colors.dangerSoft,
    borderRadius: radii.control,
    justifyContent: 'center',
    minHeight: controls.minTap,
    minWidth: 72,
    paddingHorizontal: spacing.md,
  },
  dangerButtonText: {
    color: colors.danger,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  disabledButton: {
    backgroundColor: colors.surfaceMuted,
  },
  disabledButtonText: {
    color: colors.subtleText,
  },
  pressed: {
    ...shadows.pressed,
  },
});
