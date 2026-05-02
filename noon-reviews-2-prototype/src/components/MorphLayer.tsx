import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import type { SourceRect } from './ShipmentCard';

interface Props {
  productImage: ImageSourcePropType;
  source: SourceRect;
  target: SourceRect;
  // Vertical offset (px) of the arc's midpoint from the straight-line midpoint.
  // Positive = the path bows DOWN (concave-up valley) — opposite to the image's
  // overall upward travel, giving the flight a soft "weighted" curve.
  arcDip?: number;
  durationMs?: number;
  onComplete?: () => void;
}

const SOURCE_RADIUS = 8;
const TARGET_RADIUS = 9999;          // huge → forced to half-height = circle

// iOS drawer curve (from Emil's playbook) — soft, weighted, never sluggish.
const EASING = Easing.bezier(0.32, 0.72, 0, 1);

export default function MorphLayer({
  productImage,
  source,
  target,
  arcDip = 90,
  durationMs = 800,
  onComplete,
}: Props) {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(t, {
      toValue: 1,
      duration: durationMs,
      easing: EASING,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) onComplete?.();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inverted arc: peak sits BELOW the straight-line midpoint by `arcDip` px.
  // If image moves up (target.y < source.y), the path bows down before rising.
  const midY = (source.y + target.y) / 2;
  const peakY = midY + arcDip;

  const x = t.interpolate({
    inputRange: [0, 1],
    outputRange: [source.x, target.x],
  });
  const y = t.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [source.y, peakY, target.y],
  });
  const width = t.interpolate({
    inputRange: [0, 1],
    outputRange: [source.width, target.width],
  });
  const height = t.interpolate({
    inputRange: [0, 1],
    outputRange: [source.height, target.height],
  });
  const borderRadius = t.interpolate({
    inputRange: [0, 1],
    outputRange: [SOURCE_RADIUS, TARGET_RADIUS],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.frame,
        {
          left: x,
          top: y,
          width,
          height,
          borderRadius,
        },
      ]}
    >
      <Image source={productImage} style={styles.image} resizeMode="cover" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  frame: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.75,
    borderColor: '#F2F3F7',
    zIndex: 50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
