import {
  Bookmark,
  Clock,
} from 'lucide-react-native';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

import { AppHeader } from '../components/AppHeader';
import { EmptyState } from '../components/EmptyState';
import { useCitadel } from '../context/CitadelContext';
import {
  colors,
  fonts,
  layout,
  radii,
  spacing,
} from '../theme/theme';
import type { Snop } from '../types';

type ListProps = {
  title: string;
  emptyTitle: string;
  emptyBody: string;
  snops: Snop[];
  onBack: () => void;
  onOpenSnop: (id: string) => void;
  emptyIcon: typeof Bookmark;
};

function SnopListScreen({
  title,
  emptyTitle,
  emptyBody,
  snops,
  onBack,
  onOpenSnop,
  emptyIcon,
}: ListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top },
      ]}
    >
      <View style={styles.top}>
        <Pressable
          onPress={onBack}
          style={styles.back}
          accessibilityLabel="Back"
        >
          <ArrowLeft
            size={20}
            color={colors.text}
          />
        </Pressable>

        <AppHeader
          title={title}
          style={styles.header}
        />
      </View>

      {snops.length === 0 ? (
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          body={emptyBody}
        />
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.list,
            {
              paddingBottom:
                insets.bottom + spacing.xxxl,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {snops.map((snop) => (
            <Pressable
              key={snop.id}
              onPress={() => onOpenSnop(snop.id)}
              style={({ pressed }) => [
                styles.item,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.swatch,
                  {
                    backgroundColor:
                      snop.accentColor,
                  },
                ]}
              />

              <View style={styles.copy}>
                <Text style={styles.cat}>
                  {snop.category}
                </Text>

                <Text style={styles.title}>
                  {snop.title}
                </Text>

                <Text style={styles.meta}>
                  {snop.source} · {snop.readingTime} min
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export function SavedSnopsScreen({
  onBack,
  onOpenSnop,
}: {
  onBack: () => void;
  onOpenSnop: (id: string) => void;
}) {
  const { savedIds, snops } = useCitadel();

  const saved = snops.filter((snop) =>
    savedIds.has(snop.id),
  );

  return (
    <SnopListScreen
      title="Saved Snops"
      emptyIcon={Bookmark}
      emptyTitle="Nothing saved yet"
      emptyBody="Bookmark a Snop and it will live here."
      snops={saved}
      onBack={onBack}
      onOpenSnop={onOpenSnop}
    />
  );
}

export function ReadingHistoryScreen({
  onBack,
  onOpenSnop,
}: {
  onBack: () => void;
  onOpenSnop: (id: string) => void;
}) {
  const { readIds, snops } = useCitadel();

  const history = readIds
    .map((id) =>
      snops.find((snop) => snop.id === id),
    )
    .filter(Boolean) as Snop[];

  return (
    <SnopListScreen
      title="Reading History"
      emptyIcon={Clock}
      emptyTitle="No footsteps yet"
      emptyBody="Open a Snop and it will appear in this trail."
      snops={history}
      onBack={onBack}
      onOpenSnop={onOpenSnop}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    width: 44,
    height: 44,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    paddingHorizontal: 0,
  },
  list: {
    paddingHorizontal: layout.headerPadX,
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth:
      StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  pressed: {
    opacity: 0.75,
  },
  swatch: {
    width: 14,
    height: 52,
    borderRadius: radii.sm,
  },
  copy: {
    flex: 1,
  },
  cat: {
    fontFamily: fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: 4,
  },
  title: {
    fontFamily: fonts.bodySemi,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  meta: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
});