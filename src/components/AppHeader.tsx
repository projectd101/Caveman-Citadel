import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { colors, fonts, layout, spacing } from '../theme/theme';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export function AppHeader({ title, subtitle, right, style, titleStyle }: AppHeaderProps) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.titles}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: layout.headerPadX,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  titles: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
  },
});
