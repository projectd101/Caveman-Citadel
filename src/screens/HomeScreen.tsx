import { useMemo, useRef } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { CategorySection } from '../components/CategorySection';
import { FeaturedSnopCard } from '../components/FeaturedSnopCard';
import { featuredSnops, snopsForCategory } from '../data/mockSnops';
import { colors, fonts, layout, spacing } from '../theme/theme';
import { CATEGORIES, type Category } from '../types';

type Props = {
  onOpenSnop: (id: string) => void;
};

export function HomeScreen({ onOpenSnop }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(320, width - 52);
  const scrollX = useRef(new Animated.Value(0)).current;

  const featured = useMemo(() => featuredSnops, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <FlatList
        data={CATEGORIES as unknown as Category[]}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <AppHeader title="Caveman Citadel" subtitle="Big ideas. Explained simply." />
            <View style={styles.featuredHead}>
              <Text style={styles.featuredLabel}>Today’s Citadel</Text>
              <Text style={styles.featuredCount}>{featured.length} featured</Text>
            </View>
            <Animated.FlatList
              data={featured}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              snapToInterval={cardWidth + 12}
              snapToAlignment="start"
              contentContainerStyle={styles.carousel}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                useNativeDriver: false,
              })}
              scrollEventThrottle={16}
              renderItem={({ item }) => (
                <FeaturedSnopCard snop={item} width={cardWidth} onPress={() => onOpenSnop(item.id)} />
              )}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            />
            <View style={styles.dots}>
              {featured.map((item, index) => {
                const inputRange = [
                  (index - 1) * (cardWidth + 12),
                  index * (cardWidth + 12),
                  (index + 1) * (cardWidth + 12),
                ];
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.25, 1, 0.25],
                  extrapolate: 'clamp',
                });
                const dotWidth = scrollX.interpolate({
                  inputRange,
                  outputRange: [6, 16, 6],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={item.id}
                    style={[styles.dot, { opacity, width: dotWidth }]}
                  />
                );
              })}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <CategorySection category={item} snops={snopsForCategory(item)} onOpen={onOpenSnop} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  featuredHead: {
    paddingHorizontal: layout.headerPadX,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  featuredLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  featuredCount: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textDim,
  },
  carousel: {
    paddingHorizontal: layout.headerPadX,
    paddingBottom: spacing.md,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.xxl,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
});
