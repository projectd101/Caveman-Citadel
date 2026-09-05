import type { ComponentType } from 'react';
import { Bookmark, Clock, Info, Settings2 } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { ProfileStat } from '../components/ProfileStat';
import { useCitadel } from '../context/CitadelContext';
import { colors, fonts, layout, radii, spacing } from '../theme/theme';

type Props = {
  onOpenSaved: () => void;
  onOpenHistory: () => void;
  onOpenPreferences: () => void;
  onOpenAbout: () => void;
};

export function ProfileScreen({ onOpenSaved, onOpenHistory, onOpenPreferences, onOpenAbout }: Props) {
  const insets = useSafeAreaInsets();
  const { savedIds, snopsReadCount } = useCitadel();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.identity}>
          <View style={styles.mark}>
            <Text style={styles.markLetter}>C</Text>
          </View>
          <View>
            <Text style={styles.name}>Caveman</Text>
            <Text style={styles.tag}>Reader in the citadel</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <ProfileStat label="Snops Read" value={snopsReadCount} />
          <ProfileStat label="Saved" value={savedIds.size} />
          <ProfileStat label="Topics" value={6} />
        </View>

        <Text style={styles.sectionLabel}>Library</Text>
        <Row icon={Bookmark} title="Saved Snops" hint="Artifacts you kept" onPress={onOpenSaved} />
        <Row icon={Clock} title="Reading History" hint="Recently opened" onPress={onOpenHistory} />

        <Text style={styles.sectionLabel}>Citadel</Text>
        <Row icon={Settings2} title="Preferences" hint="Reading and appearance" onPress={onOpenPreferences} />
        <Row icon={Info} title="About Caveman Citadel" hint="What this place is" onPress={onOpenAbout} />
      </ScrollView>
    </View>
  );
}

function Row({
  icon: Icon,
  title,
  hint,
  onPress,
}: {
  icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string;
  hint: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <View style={styles.rowIcon}>
        <Icon size={18} color={colors.accent} strokeWidth={1.8} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowHint}>{hint}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: layout.headerPadX,
    paddingBottom: spacing.xxxl,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  mark: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markLetter: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    color: colors.accent,
  },
  name: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    color: colors.text,
    letterSpacing: -0.4,
  },
  tag: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  sectionLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textDim,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCopy: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 16,
    color: colors.text,
  },
  rowHint: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
});
