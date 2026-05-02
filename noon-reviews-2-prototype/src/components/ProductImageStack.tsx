import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import MarketplaceTag, { Marketplace } from './MarketplaceTag';
import { colors } from '../theme';

const RADIUS = 8;
const TAG_HEIGHT = 12;

function ProductPhoto({ source }: { source: ImageSourcePropType }) {
  return <Image source={source} style={styles.photo} resizeMode="cover" />;
}

interface Props {
  source: ImageSourcePropType;
  marketplace: Marketplace;
  width?: number;
  height?: number;
}

export default function ProductImageStack({
  source,
  marketplace,
  width = 48,
  height = 64,
}: Props) {
  return (
    <View style={[styles.frame, { width, height }]}>
      <ProductPhoto source={source} />
      <MarketplaceTag marketplace={marketplace} width={width} height={TAG_HEIGHT} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: RADIUS,
    overflow: 'hidden',
    backgroundColor: colors.bgPrimary,
    justifyContent: 'flex-end', // pins the marketplace tag to the bottom
  },
  photo: {
    ...StyleSheet.absoluteFillObject,
  },
});
