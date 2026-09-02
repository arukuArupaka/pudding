import { type Href, usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

const items: { href: Href; label: string }[] = [
  { href: '/', label: 'ホーム' },
  { href: '/tasks', label: '課題' },
  { href: '/calendar', label: 'カレンダー' },
  { href: '/settings', label: '設定' },
];

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.footer}>
      {items.map((item) => {
        const active =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Pressable
            key={String(item.href)}
            onPress={() => {
              if (!active) {
                router.replace(item.href);
              }
            }}
            style={styles.link}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    backgroundColor:'#fff59d',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  link: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
  },
  label: {
    color:'#8F7065',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeLabel: {
    color:'#422B22',
  },
});
