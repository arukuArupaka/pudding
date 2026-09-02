import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../constants/colors';
import { Footer } from './Footer';

type ScreenProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function Screen({ title, subtitle, children }: ScreenProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.content}>{children}</View>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    alignSelf: 'center',
    flex: 1,
    maxWidth: 760,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 112,
    width: '100%',
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: typography.screenTitle,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: typography.body,
    lineHeight: 22,
  },
  content: {
    flex: 1,
    gap: spacing.md,
  },
});
