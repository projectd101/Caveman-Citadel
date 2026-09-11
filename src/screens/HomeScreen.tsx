import { useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '../components/AppHeader';
import { CategorySection } from '../components/CategorySection';
import { FeaturedSnopCard } from '../components/FeaturedSnopCard';
import { EmptyState } from '../components/EmptyState';
import { useCitadel } from '../context/CitadelContext';
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

  const {
    snops,
    loading,
    refreshing,
    error,
    refresh,
  } = useCitadel();

  const featured = useMemo(
    () => snops.filter((snop) => snop.featured),
    [snops],
  );

  const categoryData = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        category,
        snops: snops.filter((snop) => snop.category === category),
      })).filter((section) => section.snops.length > 0),
    [snops],
  );

  if (loading) {
    return (
      <View style={[styles.root, styles.center, { paddingTop: insets.top }]}>
        <ActivityIndicator color={colors.accent} />
        <Text style={styles.loadingText}>Entering the citadel...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <AppHeader
          title="Caveman Citadel"
          subtitle="Big ideas. Explained simply."
        />

        <EmptyState
          title="The citadel is unreachable"
          body={error}
        />
      </View>
    );
  }

  if (snops.length === 0) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <AppHeader
          title="Caveman Citadel"
          subtitle="Big ideas. Explained simply."
        />

        <EmptyState
          title="The citadel is empty"
          body="No Snops have been published yet. The first discoveries will appear here."
        />
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item.category}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.accent}
          />
        }
        ListHeaderComponent={
          <View>
            <AppHeader
              title="Caveman Citadel"
              subtitle="Big ideas. Explained simply."
            />

            {featured.length > 0 ? (
              <>
                <View style={styles.featuredHead}>
                  <Text style={styles.featuredLabel}>
                    Today’s Citadel
                  </Text>

                  <Text style={styles.featuredCount}>
                    {featured.length} featured
                  </Text>
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
                  onScroll={Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: { x: scrollX },
                        },
                      },
                    ],
                    { useNativeDriver: false },
                  )}
                  scrollEventThrottle={16}
                  renderItem={({ item }) => (
                    <FeaturedSnopCard
                      snop={item}
                      width={cardWidth}
                      onPress={() => onOpenSnop(item.id)}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={{ width: 12 }} />
                  )}
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
                        style={[
                          styles.dot,
                          {
                            opacity,
                            width: dotWidth,
                          },
                        ]}
                      />
                    );
                  })}
                </View>
              </>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <CategorySection
            category={item.category as Category}
            snops={item.snops}
            onOpen={onOpenSnop}
          />
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
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