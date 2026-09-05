import { Bell } from 'lucide-react-native';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { EmptyState } from '../components/EmptyState';
import { NotificationItem } from '../components/NotificationItem';
import { useCitadel } from '../context/CitadelContext';
import { colors, fonts, layout, spacing } from '../theme/theme';
import type { AppNotification } from '../types';

type Props = {
  onOpenSnop: (id: string) => void;
};

export function NotificationsScreen({ onOpenSnop }: Props) {
  const insets = useSafeAreaInsets();
  const { notifications, markNotificationRead, markAllNotificationsRead, clearNotifications } =
    useCitadel();

  const sections = [
    {
      title: 'Today',
      data: notifications.filter((n) => n.group === 'Today'),
    },
    {
      title: 'Yesterday',
      data: notifications.filter((n) => n.group === 'Yesterday'),
    },
  ].filter((s) => s.data.length > 0);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader
        title="Notifications"
        right={
          notifications.length ? (
            <View style={styles.actions}>
              <Pressable onPress={markAllNotificationsRead} hitSlop={8}>
                <Text style={styles.action}>Mark read</Text>
              </Pressable>
              <Pressable onPress={clearNotifications} hitSlop={8}>
                <Text style={styles.actionMuted}>Clear</Text>
              </Pressable>
            </View>
          ) : null
        }
      />
      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="The citadel is quiet"
          body="When new Snops arrive from the journals, they will gather here."
        />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => <Text style={styles.group}>{section.title}</Text>}
          renderItem={({ item }: { item: AppNotification }) => (
            <NotificationItem
              item={item}
              onPress={() => {
                markNotificationRead(item.id);
                if (item.snopId) {
                  onOpenSnop(item.snopId);
                }
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  actions: {
    gap: 10,
    alignItems: 'flex-end',
  },
  action: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.accent,
  },
  actionMuted: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textDim,
  },
  list: {
    paddingHorizontal: layout.headerPadX,
    paddingBottom: spacing.xxl,
  },
  group: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textDim,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sep: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
