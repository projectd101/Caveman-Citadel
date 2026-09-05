import { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { ArrowLeft, Bookmark } from 'lucide-react-native';
import { useCitadel } from '../context/CitadelContext';
import { snopsById } from '../data/mockSnops';
import { colors, fonts, layout, radii, spacing } from '../theme/theme';

type Props = {
  snopId: string;
  onBack: () => void;
};

export function SnopDetailScreen({ snopId, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const snop = snopsById[snopId];
  const { isSaved, toggleSaved, markRead } = useCitadel();
  const saved = snop ? isSaved(snop.id) : false;
  const bookmarkScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (snop) {
      markRead(snop.id);
    }
  }, [snop, markRead]);

  if (!snop) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <ArrowLeft size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.missing}>This Snop is no longer in the citadel.</Text>
      </View>
    );
  }

  const onBookmark = () => {
    Animated.sequence([
      Animated.spring(bookmarkScale, { toValue: 1.18, useNativeDriver: true, speed: 40, bounciness: 8 }),
      Animated.spring(bookmarkScale, { toValue: 1, useNativeDriver: true, speed: 28, bounciness: 6 }),
    ]).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    toggleSaved(snop.id);
  };

  const paragraphs = snop.content.split('\n\n');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={[styles.accent, { backgroundColor: snop.accentColor }]} />
      <View style={styles.toolbar}>
        <Pressable onPress={onBack} style={styles.iconBtn} hitSlop={8} accessibilityLabel="Back">
          <ArrowLeft size={20} color={colors.text} strokeWidth={1.8} />
        </Pressable>
        <Pressable onPress={onBookmark} style={styles.iconBtn} hitSlop={8} accessibilityLabel="Save Snop">
          <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
            <Bookmark
              size={20}
              color={saved ? colors.accent : colors.text}
              fill={saved ? colors.accent : 'transparent'}
              strokeWidth={1.8}
            />
          </Animated.View>
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
      >
        <Text style={styles.category}>{snop.category}</Text>
        <Text style={styles.headline}>{snop.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{snop.source}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.meta}>{snop.date}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.meta}>{snop.readingTime} min read</Text>
        </View>
        {paragraphs.map((p) => (
          <Text key={p.slice(0, 24)} style={styles.body}>
            {p}
          </Text>
        ))}
        <View style={styles.matters}>
          <Text style={styles.mattersLabel}>Why this matters</Text>
          <Text style={styles.mattersBody}>{snop.whyItMatters}</Text>
        </View>
        <Text style={styles.attribution}>
          Source attribution · {snop.source}. Mock editorial adaptation for Caveman Citadel.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  accent: {
    height: 4,
    width: '100%',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: layout.headerPadX - 8,
    paddingVertical: spacing.sm,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    padding: layout.headerPadX,
  },
  missing: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    paddingHorizontal: layout.headerPadX,
  },
  content: {
    paddingHorizontal: layout.headerPadX,
    paddingTop: spacing.sm,
  },
  category: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: spacing.md,
  },
  headline: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.7,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  meta: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.textMuted,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textDim,
    marginHorizontal: 8,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 28,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  matters: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mattersLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: spacing.md,
  },
  mattersBody: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.text,
  },
  attribution: {
    marginTop: spacing.xxl,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textDim,
  },
});
