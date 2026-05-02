import React from 'react';
import { Image, Pressable, ImageSourcePropType } from 'react-native';
import { filterChipBaseStyle } from './FilterChip';

const LOGO_WIDTH = 60;
const LOGO_HEIGHT = 14;

const SOURCES = {
  express: require('../../assets/marketplace-tags/express-filter.png'),
  supermall: require('../../assets/marketplace-tags/supermall-filter.png'),
};

export type MarketplaceFilter = keyof typeof SOURCES;

function MarketplaceFilterLogo({ source }: { source: ImageSourcePropType }) {
  return (
    <Image
      source={source}
      style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
      resizeMode="contain"
    />
  );
}

interface Props {
  marketplace: MarketplaceFilter;
  onPress?: () => void;
}

// Filter chip that shows a 60×14 marketplace logo instead of a text label.
export default function MarketplaceFilterChip({ marketplace, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [filterChipBaseStyle.chip, pressed && { opacity: 0.65 }]}
    >
      <MarketplaceFilterLogo source={SOURCES[marketplace]} />
    </Pressable>
  );
}
