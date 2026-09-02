import { Image, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';

export default function HomeScreen() {
  return (
    <Screen title="Pudding🍮">
      {/* 上の2つのカード */}
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

      {/* 吹き出し */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>今日やること!!!</Text>

        <View style={styles.todo}>
          <Text style={styles.cardText}>数学プリントを提出</Text>
        </View>

        <View style={styles.tail} />
      </View>

      {/* キャラクター */}
      <Image
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

  tail: {
    position: 'absolute',
    bottom: -16,
    right: 70,

    width: 0,
    height: 0,

    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderTopWidth: 20,

    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },

 character: {
  width: 270,
  height: 270,
  marginTop: -30,
  marginLeft: 160,
},
});
