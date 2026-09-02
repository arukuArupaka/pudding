import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { usePathname, useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radii, shadows } from '../constants/colors';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type TabHref = '/' | '/tasks' | '/calendar' | '/settings';

const items: {
  href: TabHref;
  icon: MaterialIconName;
  label: string;
}[] = [
  { href: '/', icon: 'home', label: 'ホーム' },
  { href: '/tasks', icon: 'assignment', label: '課題' },
  { href: '/calendar', icon: 'calendar-today', label: 'カレンダー' },
  { href: '/settings', icon: 'settings', label: '設定' },
];

const hasNativeBlurView =
  Platform.OS === 'web' ||
  Boolean(
    UIManager.getViewManagerConfig?.('ExpoBlurView') ??
      UIManager.getViewManagerConfig?.('ViewManagerAdapter_ExpoBlur_ExpoBlurView')
  );

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const tabs = items.map((item) => {
    const active =
      item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
    const color = active ? colors.tabActive : colors.tabInactive;

    return (
      <Pressable
        key={item.href}
        onPress={() => {
          if (!active) {
            router.replace(item.href);
          }
        }}
        style={({ pressed }) =>
          StyleSheet.flatten([
            styles.link,
            active && styles.activeLink,
            pressed && styles.pressed,
          ])
        }
      >
        <MaterialIcons name={item.icon} size={22} color={color} />
        <Text style={[styles.label, { color }]}>{item.label}</Text>
      </Pressable>
    );
  });

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {hasNativeBlurView ? (
        <BlurView intensity={82} tint="light" style={styles.footer}>
          <View style={styles.glassOverlay} />
          {tabs}
        </BlurView>
      ) : (
        <View style={styles.footer}>
          <View style={styles.glassOverlay} />
          {tabs}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    paddingHorizontal: 18,
    paddingTop: 10,
    position: 'absolute',
    right: 0,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: colors.glassSurface,
    borderColor: colors.glassBorder,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
    maxWidth: 430,
    minHeight: 68,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '100%',
    ...shadows.navigation,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.glassSurface,
  },
  link: {
    alignItems: 'center',
    borderRadius: radii.pill,
    flex: 1,
    gap: 3,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 8,
    paddingVertical: 6,
    zIndex: 1,
  },
  activeLink: {
    backgroundColor: colors.tabActiveSoft,
  },
  pressed: {
    ...shadows.pressed,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    textAlign: 'center',
  },
});
