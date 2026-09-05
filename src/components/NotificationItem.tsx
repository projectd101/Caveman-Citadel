import { Bell, Bookmark, Sparkles } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';
import type { AppNotification } from '../types';

type Props = {
  item: AppNotification;
  onPress: () => void;
};

const ICONS = {
  new: Bell,
  featured: Sparkles,
  category: Bookmark,
} as const;

export function NotificationItem({ item, onPress }: Props) {
  const Icon = ICONS[item.kind];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, item.unread && styles.iconUnread]}>
        <Icon size={16} color={item.unread ? colors.accent : colors.textMuted} strokeWidth={1.8} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread ? <View style={styles.unread} /> : <View style={styles.unreadSpacer} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: 4,
    borderRadius: radii.md,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconUnread: {
    backgroundColor: colors.accentSoft,
    borderColor: 'rgba(201, 164, 106, 0.28)',
  },
  copy: {
    flex: 1,
    paddingTop: 2,
  },
  title: {
    fontFamily: fonts.bodySemi,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  description: {
    marginTop: 3,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
  },
  meta: {
    alignItems: 'flex-end',
    gap: 8,
    paddingTop: 4,
    minWidth: 54,
  },
  time: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.textDim,
  },
  unread: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  unreadSpacer: {
    width: 7,
    height: 7,
  },
});
