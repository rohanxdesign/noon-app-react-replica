import React, { useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface StarRatingProps {
  rating: number;
  size?: number;
  gap?: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
  animated?: boolean;
}

const Star = ({
  filled,
  size,
  index,
  onPress,
  interactive,
  animated,
}: {
  filled: boolean;
  size: number;
  index: number;
  onPress: () => void;
  interactive: boolean;
  animated: boolean;
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}deg` },
    ],
  }));

  const handlePress = useCallback(() => {
    if (!interactive) return;
    scale.value = withSequence(
      withSpring(1.4, { damping: 4, stiffness: 300 }),
      withSpring(1, { damping: 6, stiffness: 200 })
    );
    rotation.value = withSequence(
      withTiming(-15, { duration: 80 }),
      withTiming(15, { duration: 80 }),
      withTiming(0, { duration: 80 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }, [interactive, onPress]);

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[animatedStyle, { padding: 2 }]}
      hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
    >
      <Ionicons
        name={filled ? 'star' : 'star-outline'}
        size={size}
        color={filled ? colors.starFilled : colors.starOutline}
      />
    </AnimatedPressable>
  );
};

export default function StarRating({
  rating,
  size = 24,
  gap = 3,
  onRate,
  interactive = true,
  animated = true,
}: StarRatingProps) {
  return (
    <View style={[styles.container, { gap }]}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          size={size}
          index={star}
          onPress={() => onRate?.(star)}
          interactive={interactive}
          animated={animated}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
