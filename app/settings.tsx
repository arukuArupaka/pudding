import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { colors } from '../constants/colors';

export default function SettingsScreen() {
  return (
    <Screen title="設定" subtitle="アプリの基本設定">
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
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  value: {
    color: colors.mutedText,
    fontSize: 15,
  },
});
