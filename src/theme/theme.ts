export const colors = {
  bg: '#08090B',
  bgElevated: '#101217',
  surface: '#15171C',
  surfaceMuted: '#1B1E25',
  border: 'rgba(237, 230, 216, 0.08)',
  borderStrong: 'rgba(237, 230, 216, 0.16)',
  text: '#F4EFE6',
  textMuted: '#A49C8D',
  textDim: '#6F695D',
  accent: '#C9A46A',
  accentSoft: 'rgba(201, 164, 106, 0.14)',
  danger: '#C45C3E',
  overlay: 'rgba(8, 9, 11, 0.55)',
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
  xl: 22,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const layout = {
  headerPadX: 20,
  sectionGap: 28,
  tabBarHeight: 58,
  tileGap: 8,
};
