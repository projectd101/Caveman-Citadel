import { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bookmark,
  Heart,
  MessageCircle,
  Send,
  Settings2,
} from 'lucide-react-native';

import { MOCK_REELS } from '../data/mockReels';
import { colors, fonts, radii, spacing } from '../theme/theme';
import type { Reel } from '../types';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

type ReelCardProps = {
  reel: Reel;
  height: number;
};

function ReelCard({ reel, height }: ReelCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={[styles.card, { height }]}>
      <Image
        source={{ uri: reel.mediaUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      <View
        style={[
          StyleSheet.absoluteFill,
          styles.scrim,
          { backgroundColor: reel.accentColor + '33' },
        ]}
      />

      <View style={styles.topRow}>
        <Settings2 size={20} color={colors.text} strokeWidth={1.8} />
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.meta}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>
              {reel.projectHandle.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.metaText}>
            <Text style={styles.handle}>@{reel.projectHandle}</Text>
            <Text style={styles.label}>{reel.projectLabel}</Text>
          </View>
        </View>

        <Text style={styles.caption} numberOfLines={4}>
          <Text style={styles.captionHandle}>{reel.projectHandle}</Text>{' '}
          {reel.caption}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionItem}
          hitSlop={10}
          onPress={() => setLiked((v) => !v)}
        >
          <Heart
            size={26}
            color={liked ? colors.danger : colors.text}
            fill={liked ? colors.danger : 'transparent'}
            strokeWidth={1.8}
          />
          <Text style={styles.actionCount}>
            {reel.likes + (liked ? 1 : 0)}
          </Text>
        </Pressable>

        <Pressable style={styles.actionItem} hitSlop={10}>
          <MessageCircle size={25} color={colors.text} strokeWidth={1.8} />
          <Text style={styles.actionCount}>{reel.comments}</Text>
        </Pressable>

        <Pressable style={styles.actionItem} hitSlop={10}>
          <Send size={23} color={colors.text} strokeWidth={1.8} />
        </Pressable>

        <Pressable
          style={styles.actionItem}
          hitSlop={10}
          onPress={() => setSaved((v) => !v)}
        >
          <Bookmark
            size={23}
            color={colors.text}
            fill={saved ? colors.accent : 'transparent'}
            strokeWidth={1.8}
          />
        </Pressable>
      </View>
    </View>
  );
}

export function ReelsScreen() {
  const insets = useSafeAreaInsets();
  const tabBarOffset = 58 + insets.bottom;
  const cardHeight = SCREEN_HEIGHT - tabBarOffset;

  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

  const renderItem = useCallback(
    ({ item }: { item: Reel }) => <ReelCard reel={item} height={cardHeight} />,
    [cardHeight],
  );

  return (
    <View style={[styles.root, { height: cardHeight }]}>
      <FlatList
        data={MOCK_REELS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={cardHeight}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: cardHeight,
          offset: cardHeight * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        extraData={activeIndex}
      />

      <View style={[styles.headerOverlay, { top: insets.top + spacing.sm }]}>
        <Text style={styles.headerTitle}>Reels</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
  card: {
    width: SCREEN_WIDTH,
    backgroundColor: colors.surface,
    justifyContent: 'space-between',
  },
  scrim: {
    opacity: 0.5,
  },
  headerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 15,
    letterSpacing: 0.4,
    color: colors.text,
  },
  topRow: {
    position: 'absolute',
    top: spacing.xxl + spacing.md,
    right: spacing.lg,
    alignItems: 'flex-end',
  },
  bottomRow: {
    position: 'absolute',
    left: spacing.lg,
    right: 88,
    bottom: spacing.xxl,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: radii.full,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.accent,
  },
  metaText: {
    flex: 1,
  },
  handle: {
    fontFamily: fonts.bodySemi,
    fontSize: 14,
    color: colors.text,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
  },
  captionHandle: {
    fontFamily: fonts.bodySemi,
  },
  actions: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xxl,
    alignItems: 'center',
    gap: spacing.lg,
  },
  actionItem: {
    alignItems: 'center',
    gap: 4,
  },
  actionCount: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.text,
  },
});
