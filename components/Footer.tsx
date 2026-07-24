import { Link, usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

const items = [
  { href: '/', label: 'ホーム' },
  { href: '/tasks', label: '課題' },
  { href: '/calendar', label: 'カレンダー' },
  { href: '/settings', label: '設定' },
] as const;

export function Footer() {
  const pathname = usePathname();

  return (
    <View style={styles.footer}>
      {items.map((item) => {
        const active =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link key={item.href} href={item.href} style={styles.link}>
            <Text style={[styles.label, active && styles.activeLabel]}>
              {item.label}
            </Text>
          </Link>
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
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  link: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
  },
  label: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeLabel: {
    color: colors.primary,
  },
});
