import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { getDateKey, startOfDay } from '../constants/tasks';
import { useTasks } from '../lib/tasks';

export default function HomeScreen() {
  const router = useRouter();
  const { settings, tasks } = useTasks();
  const todayKey = getDateKey(startOfDay(new Date()));
  const visibleTasks = tasks.filter(
    (task) =>
      settings.showExpiredTasks || !task.dueDateKey || task.dueDateKey >= todayKey
  );
  const incompleteTasks = visibleTasks.filter((task) => !task.completed);
  const todayTasks = tasks.filter(
    (task) =>
      task.dueDateKey === todayKey &&
      (settings.showCompletedTasks || !task.completed)
  );
  const todayTask = todayTasks.find((task) => !task.completed) ?? todayTasks[0];

  return (
    <Screen title="Pudding🍮">
      {/* 上の2つのカード */}
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/tasks')}
          style={({ pressed }) =>
            StyleSheet.flatten([styles.smallCard, pressed && styles.pressed])
          }
        >
          <Text style={styles.number}>{incompleteTasks.length}</Text>
          <Text style={styles.label}>未完了</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/calendar')}
          style={({ pressed }) =>
            StyleSheet.flatten([styles.smallCard, pressed && styles.pressed])
          }
        >
          <Text style={styles.number}>{todayTasks.length}</Text>
          <Text style={styles.label}>今日の予定</Text>
        </Pressable>
      </View>

      {/* 吹き出し */}
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/tasks')}
        style={({ pressed }) =>
          StyleSheet.flatten([styles.card, pressed && styles.pressed])
        }
      >
        <Text style={styles.cardTitle}>今日やること!!!</Text>

        <View style={styles.todo}>
          <Text style={styles.cardText}>
            {todayTask ? todayTask.title : '今日の課題はありません'}
          </Text>
        </View>

        <View style={styles.tail} />
      </Pressable>

      {/* キャラクター */}
      <Image
        resizeMode="contain"
        source={require('../assets/images/purin.png')}
        style={styles.character}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },

  smallCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingVertical: 30,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  number: {
    fontSize: 44,
    fontWeight: '700',
    color: '#8D6E63',
  },

  label: {
    fontSize: 16,
    marginTop: 8,
    color: '#8D6E63',
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 24,
    position: 'relative',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#8D6E63',
    marginBottom: 20,
  },

  todo: {
    backgroundColor: '#FFE97A',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  cardText: {
    fontSize: 15,
    color: '#8D6E63',
    fontWeight: '700',

  },
  pressed: {
    shadowOpacity: 0.04,
    shadowRadius: 6,
    transform: [
      {
        translateY: 2,
      },
    ],
  },

  tail: {
    position: 'absolute',
    bottom: -16,
    right: 118,

    width: 0,
    height: 0,

    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderTopWidth: 20,

    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    transform: [
      {
        rotate: '18deg',
      },
    ],
  },

  character: {
    alignSelf: 'center',
    height: 270,
    marginTop: -30,
    width: 270,
  },
});
