import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, shadows, spacing } from '../theme/theme';
import type { Snop } from '../types';

type Props = {
  snop: Snop;
  width: number;
  onPress: () => void;
};

export function FeaturedSnopCard({ snop, width, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.975, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 28, bounciness: 6 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[styles.card, shadows.card, { width, transform: [{ scale }] }]}>
        <View style={[styles.wash, { backgroundColor: snop.accentColor }]} />
        <View style={styles.inner}>
          <View style={styles.topRow}>
            <Text style={styles.category}>{snop.category}</Text>
            <View style={styles.facet} />
          </View>
          <Text style={styles.title}>{snop.title}</Text>
          <Text style={styles.summary} numberOfLines={3}>
            {snop.summary}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{snop.source}</Text>
            <View style={styles.dot} />
            <Text style={styles.metaText}>{snop.readingTime} min</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 214,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  wash: {
    ...StyleSheet.absoluteFill,
    opacity: 0.92,
  },
  inner: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.82)',
  },
  facet: {
    width: 10,
    height: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.45)',
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.4,
    color: '#FFF8EE',
    marginTop: spacing.sm,
  },
  summary: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,248,238,0.86)',
    marginTop: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  metaText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 0.4,
    color: 'rgba(255,248,238,0.78)',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,248,238,0.5)',
    marginHorizontal: 8,
  },
});
