import React from 'react';
import { Image, ImageStyle } from 'react-native';

export type Marketplace = 'express' | 'supermall' | 'market' | 'global';

const SOURCES = {
  express: require('../../assets/marketplace-tags/express.png'),
  supermall: require('../../assets/marketplace-tags/supermall.png'),
  market: require('../../assets/marketplace-tags/market.png'),
  global: require('../../assets/marketplace-tags/global.png'),
};

interface Props {
  marketplace: Marketplace;
  width?: number;
  height?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
}

// Pure image — no wrapper. The PNG already includes its own background fill.
export default function MarketplaceTag({
  marketplace,
  width = 48,
  height = 12,
  bottomLeftRadius = 8,
  bottomRightRadius = 8,
}: Props) {
  const style: ImageStyle = {
    width,
    height,
    borderBottomLeftRadius: bottomLeftRadius,
    borderBottomRightRadius: bottomRightRadius,
  };
  return <Image source={SOURCES[marketplace]} style={style} resizeMode="stretch" />;
}
