import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Screen } from '../../components/Screen';
import { colors } from '../../constants/colors';
import { addTask } from '../../utils/tasks';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddTask = async () => {
    console.log('追加ボタンが押されました');

    if (!title.trim()) {
      Alert.alert(
        '入力してください',
        '課題名を入力してください'
      );
      return;
    }

    if (!deadline.trim()) {
      Alert.alert(
        '入力してください',
        '期限を入力してください'
      );
      return;
    }

    console.log('入力チェックOK');

    const deadlineDate = parseDeadline(deadline);

    if (!deadlineDate) {
      Alert.alert(
        '期限が正しくありません',
        '「9月3日」のように入力してください'
      );
      return;
    }

    console.log('日付変換OK:', deadlineDate);

    try {
      const task = {
        id: Date.now().toString(),
        title: title.trim(),
        subject: '未分類',
        deadline: deadlineDate.toISOString(),
        completed: false,
      };

      console.log('保存する課題:', task);

      await addTask(task);

      console.log('保存成功');

      Alert.alert(
        '追加しました！',
        `「${task.title}」を課題一覧に追加しました🍮`
      );

      setTitle('');
      setDeadline('');
    } catch (error) {
      console.error('課題追加エラー:', error);

      Alert.alert(
        'エラー',
        '課題を追加できませんでした'
      );
    }
  };

  return (
    <Screen
      title="課題追加"
      subtitle="新しい課題を入力"
    >
      <View style={styles.field}>
        <Text style={styles.label}>
          課題名
        </Text>

        <TextInput
          placeholder="例: 国語の作文"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          期限
        </Text>

        <TextInput
          placeholder="例: 9月3日"
          style={styles.input}
          value={deadline}
          onChangeText={setDeadline}
        />
      </View>

      <Pressable
        style={styles.button}
        onPress={handleAddTask}
      >
        <Text style={styles.buttonText}>
          追加する
        </Text>
      </Pressable>
    </Screen>
  );
}

function parseDeadline(
  text: string
): Date | null {
  const match = text.match(
    /(\d{1,2})月(\d{1,2})日/
  );

  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const day = Number(match[2]);

  const now = new Date();

  const date = new Date(
    now.getFullYear(),
    month - 1,
    day
  );

  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
    marginBottom: 20,
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
