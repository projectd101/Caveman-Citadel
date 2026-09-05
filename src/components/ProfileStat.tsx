import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';

type Props = {
  label: string;
  value: string | number;
};

export function ProfileStat({ label, value }: Props) {
  return (
    <View style={styles.stat}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  value: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    lineHeight: 30,
    color: colors.text,
    letterSpacing: -0.4,
  },
  label: {
    marginTop: 6,
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
});
