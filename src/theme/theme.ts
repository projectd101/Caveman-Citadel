export const colors = {
  bg: '#F7FAF8',
  bgElevated: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: '#EAF5EE',
  border: '#D9E7DE',
  borderStrong: '#BED7C7',
  text: '#263238',
  textMuted: '#6E7D75',
  textDim: '#9AA9A0',
  accent: '#58CC02',
  accentDark: '#46A302',
  accentSoft: '#DDF6C9',
  blue: '#1CB0F6',
  blueDark: '#1696D2',
  yellow: '#FFC800',
  purple: '#A560E8',
  danger: '#FF4B4B',
  overlay: 'rgba(38, 50, 56, 0.55)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const fonts = {
  display: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  displayItalic: 'Fraunces_500Medium_Italic',
  body: 'IBMPlexSans_400Regular',
  bodyMedium: 'IBMPlexSans_500Medium',
  bodySemi: 'IBMPlexSans_600SemiBold',
  bodyBold: 'IBMPlexSans_700Bold',
} as const;

export const type = {
  brand: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: colors.text,
  },
  screenTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.5,
    color: colors.text,
  },
  category: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.4,
    color: colors.text,
  },
  headline: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: colors.text,
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.3,
    color: colors.text,
  },
  tileTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.2,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 27,
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
    color: colors.textMuted,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
  },
  label: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
  },
};

export const shadows = {
  card: {
    shadowColor: '#2D6B45',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.16,
    shadowRadius: 0,
    elevation: 5,
  },
  soft: {
    shadowColor: '#2D6B45',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 0,
    elevation: 3,
  },
};

export const layout = {
  headerPadX: 20,
  sectionGap: 28,
  tabBarHeight: 58,
  tileGap: 8,
};
