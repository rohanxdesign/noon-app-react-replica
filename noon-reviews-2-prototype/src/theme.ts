export const colors = {
  // Primary noon colors
  noonYellow: '#FEEE00',
  noonBlack: '#404553',

  // Background
  bgPrimary: '#f9f9fb',   // blue-gray/100
  bgWhite: '#ffffff',

  // Blue grays
  blueGray200: '#f2f3f7',
  blueGray300: '#eaecf0',
  blueGray600: '#666d85',
  blueGray800: '#343d54',
  blueGray900: '#1d2539',
  blueGray1000: '#101628',

  // Blues
  blue100: '#e1efff',
  blue1000: '#002888',

  // Semantic
  grassGreen: '#108757',
  green800: '#329537',
  red700: '#de1c1c',

  // Stars
  starFilled: '#329537',
  starOutline: '#D1D5DB',
  starGold: '#FEEE00',

  // Overlay
  overlay: 'rgba(0,0,0,0.4)',

  // Toast
  toastSuccess: '#108757',
  toastWarning: '#E8A500',
  toastError: '#de1c1c',
};

export const spacing = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  xxl: 12,
  xxxl: 16,
  huge: 20,
  massive: 24,
};

export const radius = {
  sm: 5,
  md: 8,
  lg: 12,
  xl: 16,
  round: 2000,
};

export const typography = {
  h4: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  label2: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 20,
    letterSpacing: -0.16,
  },
  label3: {
    fontSize: 14,
    fontWeight: '700' as const,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  label3Medium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  label4: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 14,
    letterSpacing: -0.12,
  },
  label4Semibold: {
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 14,
    letterSpacing: -0.12,
  },
  label5: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 12,
    letterSpacing: -0.12,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: 0,
  },
  body3: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
  tiny: {
    fontSize: 10,
    fontWeight: '600' as const,
    lineHeight: 12,
    letterSpacing: 1,
  },
};
