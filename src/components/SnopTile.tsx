import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { fonts, radii } from '../theme/theme';
import type { Snop, TileSize } from '../types';

type Props = {
  snop: Snop;
  width: number;
  height: number;
  size: TileSize;
  onPress: () => void;
};

function textForBg(hex: string) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1A1612' : '#F7F1E6';
}

export function SnopTile({ snop, width, height, size, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const ink = textForBg(snop.accentColor);
  const muted = ink === '#F7F1E6' ? 'rgba(247,241,230,0.72)' : 'rgba(26,22,18,0.62)';
  const compact = size === 'xs';
  const showSource = size === 'md' || size === 'lg' || size === 'tall';

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 24, bounciness: 8 }).start();
  };

  const isInset = snop.treatment === 'inset';
  const isBand = snop.treatment === 'band';

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View
        style={[
          styles.tile,
          {
            width,
            height,
            backgroundColor: isInset || isBand ? '#14161B' : snop.accentColor,
            borderColor: isInset ? snop.accentColor : 'transparent',
            borderWidth: isInset ? 2 : 0,
            transform: [{ scale }],
          },
        ]}
      >
        {isBand ? <View style={[styles.band, { backgroundColor: snop.accentColor }]} /> : null}
        <View style={[styles.facet, { borderColor: isInset || isBand ? snop.accentColor : ink }]} />
        <View style={styles.copy}>
          {size !== 'xs' ? (
            <Text style={[styles.cat, { color: isInset || isBand ? snop.accentColor : muted }]}>
              {snop.category}
            </Text>
          ) : null}
          <Text
            numberOfLines={compact ? 3 : 4}
            style={[
              styles.title,
              {
                color: isInset || isBand ? '#F4EFE6' : ink,
                fontSize: compact ? 10 : size === 'sm' ? 11 : 12,
                lineHeight: compact ? 13 : 15,
              },
            ]}
          >
            {snop.title}
          </Text>
          {showSource ? (
            <Text numberOfLines={1} style={[styles.source, { color: isInset || isBand ? '#A49C8D' : muted }]}>
              {snop.readingTime}m
            </Text>
          ) : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: radii.md,
    overflow: 'hidden',
    padding: 10,
    justifyContent: 'flex-end',
  },
  band: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 7,
  },
  facet: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderWidth: 1.4,
    opacity: 0.7,
  },
  copy: {
    gap: 4,
  },
  cat: {
    fontFamily: fonts.bodySemi,
    fontSize: 8,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.bodySemi,
    letterSpacing: -0.1,
  },
  source: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    marginTop: 2,
  },
});
