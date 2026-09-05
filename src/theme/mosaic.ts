import type { Category, TileSize } from '../types';

export const MOSAIC_ROWS: Record<Category, TileSize[][]> = {
  AI: [
    ['md', 'md', 'sm'],
    ['sm', 'lg', 'xs'],
    ['tall', 'sm', 'md'],
  ],
  Physics: [
    ['lg', 'sm', 'xs'],
    ['md', 'tall', 'sm'],
    ['sm', 'md'],
  ],
  Science: [
    ['md', 'sm', 'md'],
    ['lg', 'xs', 'sm'],
    ['sm', 'md'],
  ],
  Technology: [
    ['sm', 'lg', 'xs'],
    ['md', 'md'],
    ['tall', 'sm'],
  ],
  Mathematics: [
    ['lg', 'sm'],
    ['md', 'xs', 'sm'],
    ['sm', 'md'],
  ],
  Space: [
    ['md', 'lg'],
    ['sm', 'xs', 'md'],
    ['tall', 'sm'],
  ],
};

export const SIZE_SPAN: Record<TileSize, number> = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  tall: 4,
};

export const SIZE_HEIGHT: Record<TileSize, number> = {
  xs: 72,
  sm: 92,
  md: 108,
  lg: 108,
  tall: 136,
};
