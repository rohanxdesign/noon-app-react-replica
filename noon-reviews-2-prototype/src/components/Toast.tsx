import React, { useEffect } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'warning' | 'error';
  icon?: string;
  onHide?: () => void;
  duration?: number;
}

export default function Toast({
  visible,
  message,
  type = 'success',
  icon,
  onHide,
  duration = 3000,
}: ToastProps) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withDelay(
        duration,
        withTiming(-100, { duration: 300 }, (finished) => {
          if (finished && onHide) {
            runOnJS(onHide)();
          }
        })
      );
      opacity.value = withDelay(duration, withTiming(0, { duration: 300 }));
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const bgColor =
    type === 'success' ? colors.toastSuccess :
    type === 'warning' ? colors.toastWarning :
    colors.toastError;

  const iconName =
    type === 'success' ? 'checkmark-circle' :
    type === 'warning' ? 'warning' :
    'close-circle';

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: bgColor }]}>
      <Ionicons name={iconName as any} size={20} color="white" />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 10,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  message: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    letterSpacing: -0.14,
  },
});
