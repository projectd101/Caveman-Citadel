import { Bookmark, Clock } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { AppHeader } from '../components/AppHeader';
import { EmptyState } from '../components/EmptyState';
import { useCitadel } from '../context/CitadelContext';
import { snopsById } from '../data/mockSnops';
import { colors, fonts, layout, radii, spacing } from '../theme/theme';
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

function SnopListScreen({ title, emptyTitle, emptyBody, snops, onBack, onOpenSnop, emptyIcon }: ListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Pressable onPress={onBack} style={styles.back} accessibilityLabel="Back">
          <ArrowLeft size={20} color={colors.text} />
        </Pressable>
        <AppHeader title={title} style={styles.header} />
      </View>
      {snops.length === 0 ? (
        <EmptyState icon={emptyIcon} title={emptyTitle} body={emptyBody} />
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {snops.map((snop) => (
            <Pressable
              key={snop.id}
              onPress={() => onOpenSnop(snop.id)}
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            >
              <View style={[styles.swatch, { backgroundColor: snop.accentColor }]} />
              <View style={styles.copy}>
                <Text style={styles.cat}>{snop.category}</Text>
                <Text style={styles.title}>{snop.title}</Text>
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
  const saved = snops.filter((s) => savedIds.has(s.id));
  return (
    <SnopListScreen
      title="Saved Snops"
      emptyIcon={Bookmark}
      emptyTitle="Nothing saved yet"
      emptyBody="Bookmark a Snop and it will wait here like a stone on a shelf."
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
  const { readIds } = useCitadel();
  const history = readIds.map((id) => snopsById[id]).filter(Boolean);
  return (
    <SnopListScreen
      title="Reading History"
      emptyIcon={Clock}
      emptyTitle="No footsteps yet"
      emptyBody="Open a Snop from Home and it will appear in this trail."
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
    paddingBottom: spacing.xxxl,
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
