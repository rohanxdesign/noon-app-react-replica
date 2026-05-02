import { useFonts } from 'expo-font';

// Each weight is loaded as its own font family. Reference by full family name
// (e.g. `fontFamily: 'Noontree-Medium'`) instead of relying on RN's
// fontWeight prop, which doesn't reliably map to custom font weights on web.
export const fontMap = {
  'Noontree-Light': require('../assets/fonts/Noontree-Light.otf'),
  'Noontree-Regular': require('../assets/fonts/Noontree-Regular.otf'),
  'Noontree-Medium': require('../assets/fonts/Noontree-Medium.otf'),
  'Noontree-SemiBold': require('../assets/fonts/Noontree-SemiBold.otf'),
  'Noontree-Bold': require('../assets/fonts/Noontree-Bold.otf'),
  'Noontree-ExtraBold': require('../assets/fonts/Noontree-ExtraBold.otf'),
  'Noontree-Black': require('../assets/fonts/Noontree-Black.otf'),
};

export const fonts = {
  light: 'Noontree-Light',
  regular: 'Noontree-Regular',
  medium: 'Noontree-Medium',
  semibold: 'Noontree-SemiBold',
  bold: 'Noontree-Bold',
  extrabold: 'Noontree-ExtraBold',
  black: 'Noontree-Black',
} as const;

export function useNoontreeFonts() {
  return useFonts(fontMap);
}
