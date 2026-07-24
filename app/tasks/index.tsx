import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../../components/Screen';
import { colors } from '../../constants/colors';

const tasks = [
  { title: '数学プリント', due: '今日まで' },
  { title: '理科レポート', due: '7月29日' },
  { title: '英単語練習', due: '8月1日' },
];

export default function TasksScreen() {
  return (
    <Screen title="課題一覧" subtitle="提出するもの">
      <Link href="/tasks/add" style={styles.addLink}>
        <Text style={styles.addText}>課題を追加</Text>
      </Link>
      {tasks.map((task) => (
        <View key={task.title} style={styles.task}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.due}>{task.due}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  addLink: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    textAlign: 'center',
  },
  addText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  task: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  taskTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  due: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: '700',
  },
});
