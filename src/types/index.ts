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
  category: Category;
  source: Source;
  summary: string;
  content: string;
  whyItMatters: string;
  readingTime: number;
  date: string;
  accentColor: string;
  featured: boolean;
  saved: boolean;
  size: TileSize;
  treatment: TileTreatment;
};

export type NotificationKind = 'new' | 'featured' | 'category';

export type AppNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  time: string;
  group: 'Today' | 'Yesterday';
  unread: boolean;
  snopId?: string;
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
