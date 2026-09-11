import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { MOSAIC_ROWS, SIZE_HEIGHT, SIZE_SPAN } from '../theme/mosaic';
import { colors, fonts, layout, spacing } from '../theme/theme';
import type { Category, Snop, TileSize } from '../types';
import { SnopTile } from './SnopTile';

type Props = {
  category: Category;
  snops: Snop[];
  onOpen: (id: string) => void;
};

export function CategorySection({ category, snops, onOpen }: Props) {
  const { width } = useWindowDimensions();
  const pad = layout.headerPadX;
  const gap = layout.tileGap;
  const rowWidth = width - pad * 2;
  const rows = MOSAIC_ROWS[category];
  let cursor = 0;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{category}</Text>
      <View style={styles.rows}>
        {rows.map((row, rowIndex) => {
          const remaining = snops.slice(cursor);
          if (remaining.length === 0) {
            return null;
          }
          const used = row.slice(0, remaining.length);
          const totalSpan = used.reduce((sum, size) => sum + SIZE_SPAN[size], 0);
          const usable = rowWidth - gap * (used.length - 1);
          const unit = usable / totalSpan;
          const tiles = used.map((size, i) => {
            const snop = remaining[i];
            cursor += 1;
            return { snop, size };
          });

          return (
            <View key={`${category}-${rowIndex}`} style={styles.row}>
              {tiles.map(({ snop, size }, i) => (
                <SnopTile
                  key={`${snop.id}-${rowIndex}-${i}`}
                  snop={snop}
                  size={size}
                  width={Math.floor(unit * SIZE_SPAN[size])}
                  height={SIZE_HEIGHT[size as TileSize]}
                  onPress={() => onOpen(snop.id)}
                />
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: layout.headerPadX,
    marginBottom: spacing.xxl,
  },
  heading: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: colors.text,
    marginBottom: spacing.md,
  },
  rows: {
    gap: layout.tileGap,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: layout.tileGap,
  },
});
