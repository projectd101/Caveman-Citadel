import type { ComponentType } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';

type IconProps = { size?: number; color?: string; strokeWidth?: number };

type Props = {
  icon: ComponentType<IconProps>;
  title: string;
  body: string;
};

export function EmptyState({ icon: Icon, title, body }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconBox}>
        <Icon size={22} color={colors.accent} strokeWidth={1.7} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
