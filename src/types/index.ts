export const CATEGORIES = [
  'AI',
  'Physics',
  'Science',
  'Technology',
  'Mathematics',
  'Space',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const SOURCES = [
  'Quanta Magazine',
  'Phys.org',
  'MIT Technology Review',
  'IEEE Spectrum',
] as const;

export type Source = (typeof SOURCES)[number];

export type TileSize = 'xs' | 'sm' | 'md' | 'lg' | 'tall';

export type TileTreatment = 'solid' | 'inset' | 'band';

export type Snop = {
  id: string;
  title: string;
  category: string;
  source: string;
  summary: string;
  content: string;
  whyItMatters: string | null;
  readingTime: number;
  publishedAt: string;
  sourceUrl: string | null;
  accentColor: string;
  featured: boolean;
  size: TileSize;
  treatment: TileTreatment;
};

export type AppNotification = {
  id: string;
  kind: 'new' | 'featured' | 'category';
  title: string;
  description: string;
  createdAt: string;
  unread: boolean;
  snopId: string | null;
};

export type RootStackParamList = {
  Tabs: undefined;
  SnopDetail: { snopId: string };
  SavedSnops: undefined;
  ReadingHistory: undefined;
  Preferences: undefined;
  About: undefined;
};

export type TabParamList = {
  Home: undefined;
  Notifications: undefined;
  Profile: undefined;
};