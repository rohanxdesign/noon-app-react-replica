import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import StarIcon from '../icons/StarIcon';
import { colorForRating, RATING_NEUTRAL } from '../utils/ratingColors';

const STAR_SIZE = 20;
const STAR_GAP = 2;
const STAR_COUNT = 5;

export const SHIMMER_DURATION_MS = 300;

// Punchy back-out curve gives the spring feel without spring imprecision.
const POP_EASING = Easing.bezier(0.34, 1.56, 0.64, 1);
const SETTLE_EASING = Easing.bezier(0.4, 0, 0.2, 1);

function RatingStar({
  filled,
  fillColor,
  strokeColor,
  scale,
  onPress,
}: {
  filled: boolean;
  fillColor: string;
  strokeColor: string;
  scale: Animated.Value;
  onPress: () => void;
}) {
  return (
    <Pressable hitSlop={4} onPress={onPress} style={s.star}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <StarIcon
          size={STAR_SIZE}
          fill={filled ? fillColor : '#FFFFFF'}
          stroke={filled ? strokeColor : '#D0D4DD'}
        />
      </Animated.View>
    </Pressable>
  );
}

interface Props {
  rating: number;                       // 0..5
  onRate: (rating: number) => void;
  // Fired once the shimmer animation has finished — use this to navigate
  // away rather than `onRate` so the user sees the rating animate first.
  onRateSettled?: (rating: number) => void;
}

export default function RatingInputStars({ rating, onRate, onRateSettled }: Props) {
  const [shimmering, setShimmering] = useState(false);
  const scales = useRef(
    Array.from({ length: STAR_COUNT }, () => new Animated.Value(1)),
  ).current;
  const shimmerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (shimmerTimer.current) clearTimeout(shimmerTimer.current);
    },
    [],
  );

  const handleRate = (newRating: number) => {
    onRate(newRating);

    // Staggered scale punch: 1 → 1.20 → 1. Per-star ~150ms, stagger 35ms,
    // worst-case total = 35 * (5 - 1) + 150 = 290ms — under the 300ms cap.
    const stagger = 35;
    const popDur = 80;
    const settleDur = 70;
    const animations = Array.from({ length: newRating }, (_, i) =>
      Animated.sequence([
        Animated.timing(scales[i], {
          toValue: 1.2,
          duration: popDur,
          easing: POP_EASING,
          useNativeDriver: true,
        }),
        Animated.timing(scales[i], {
          toValue: 1,
          duration: settleDur,
          easing: SETTLE_EASING,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.stagger(stagger, animations).start();

    setShimmering(true);
    if (shimmerTimer.current) clearTimeout(shimmerTimer.current);
    shimmerTimer.current = setTimeout(() => {
      setShimmering(false);
      onRateSettled?.(newRating);
    }, SHIMMER_DURATION_MS);
  };

  // Filled stars use loading grey while shimmering, then settle into the
  // sentiment color matching the chosen rating.
  const finalColor = colorForRating(rating);
  const filledColor = shimmering ? RATING_NEUTRAL : finalColor;

  return (
    <View style={s.row}>
      {[1, 2, 3, 4, 5].map(value => (
        <RatingStar
          key={value}
          filled={value <= rating}
          fillColor={filledColor}
          strokeColor={filledColor}
          scale={scales[value - 1]}
          onPress={() => handleRate(value)}
        />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: STAR_GAP,
  },
  star: {
    width: STAR_SIZE,
    height: STAR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
