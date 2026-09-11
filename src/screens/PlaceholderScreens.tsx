import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { colors, fonts, layout, spacing } from '../theme/theme';

type PrefsProps = {
  onBack: () => void;
};

export function PreferencesScreen({ onBack }: PrefsProps) {
  const insets = useSafeAreaInsets();
  const [longform, setLongform] = useState(true);
  const [briefings, setBriefings] = useState(true);
  const [haptics, setHaptics] = useState(true);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Pressable onPress={onBack} style={styles.back} accessibilityLabel="Back">
          <ArrowLeft size={20} color={colors.text} />
        </Pressable>
        <AppHeader title="Preferences" style={styles.header} />
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.note}>Settings are local placeholders for this MVP.</Text>
        <PrefRow label="Comfortable reading size" value={longform} onValueChange={setLongform} />
        <PrefRow label="Daily citadel briefing" value={briefings} onValueChange={setBriefings} />
        <PrefRow label="Haptics" value={haptics} onValueChange={setHaptics} />
      </ScrollView>
    </View>
  );
}

function PrefRow({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.pref}>
      <Text style={styles.prefLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surfaceMuted, true: colors.accent }}
        thumbColor={colors.text}
      />
    </View>
  );
}

export function AboutScreen({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Pressable onPress={onBack} style={styles.back} accessibilityLabel="Back">
          <ArrowLeft size={20} color={colors.text} />
        </Pressable>
        <AppHeader title="About" style={styles.header} />
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.kicker}>Caveman Citadel</Text>
        <Text style={styles.lede}>Complex science, explained like you’re smart but know nothing about the subject.</Text>
        <Text style={styles.p}>
          A Snop is a short, highly understandable explanation of an interesting idea in science, technology,
          mathematics, AI, or physics. The citadel collects them from journals and magazines — Quanta, Phys.org,
          MIT Technology Review, IEEE Spectrum — and recasts them as artifacts you can actually read.
        </Text>
        <Text style={styles.p}>
          This build is the interface only: mock Snops, no accounts, no scraping, no notifications backend. The
          walls come later.
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
  body: {
    paddingHorizontal: layout.headerPadX,
    paddingBottom: spacing.xxxl,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  pref: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  prefLabel: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    flex: 1,
    paddingRight: spacing.md,
  },
  kicker: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: spacing.md,
  },
  lede: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 30,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  p: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
});
