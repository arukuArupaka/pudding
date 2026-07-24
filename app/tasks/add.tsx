import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '../../components/Screen';
import { colors } from '../../constants/colors';

export default function AddTaskScreen() {
  return (
    <Screen title="課題追加" subtitle="新しい課題を入力">
      <View style={styles.field}>
        <Text style={styles.label}>課題名</Text>
        <TextInput placeholder="例: 国語の作文" style={styles.input} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>期限</Text>
        <TextInput placeholder="例: 8月5日" style={styles.input} />
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>追加する</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    padding: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 15,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },
});
