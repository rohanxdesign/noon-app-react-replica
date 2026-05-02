import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import OrderHistoryContents from './OrderHistoryContents';
import type { Shipment, SourceRect } from './ShipmentCard';

const MIN_TOP = 111;                 // top travel limit (just below the header)
const DEFAULT_INITIAL_TOP = 240;     // resting Y, flush below active orders

// Emil-style spring: snappy with a touch of overshoot — never feels sluggish.
// Apple equivalent ≈ { duration: 0.45, bounce: 0.2 }
const SHEET_SPRING = {
  stiffness: 240,
  damping: 22,
  mass: 0.85,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

// Velocity (px / ms) above which a drag counts as a flick — Emil's threshold.
const FLICK_VELOCITY = 0.11;

function OrderHistoryHandleBar() {
  return <View style={s.handleBar} />;
}

function OrderHistoryDragHandle({
  panHandlers,
  children,
}: {
  panHandlers: ReturnType<typeof PanResponder.create>['panHandlers'];
  children: React.ReactNode;
}) {
  return (
    <View {...panHandlers} style={s.dragHandle}>
      {children}
    </View>
  );
}

interface Props {
  initialTop?: number;
  onShipmentRated?: (
    shipment: Shipment,
    rating: number,
    sourceRect: SourceRect | null,
  ) => void;
  hiddenShipmentImageId?: string | null;
}

export default function OrderHistorySheet({
  initialTop = DEFAULT_INITIAL_TOP,
  onShipmentRated,
  hiddenShipmentImageId,
}: Props) {
  const top = useRef(new Animated.Value(initialTop)).current;
  const currentTopRef = useRef(initialTop);
  const dragStartTopRef = useRef(initialTop);

  useEffect(() => {
    const id = top.addListener(({ value }) => {
      currentTopRef.current = value;
    });
    return () => top.removeListener(id);
  }, [top]);

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          top.stopAnimation();
          dragStartTopRef.current = currentTopRef.current;
        },
        onPanResponderMove: (_, g) => {
          const next = Math.min(
            initialTop,
            Math.max(MIN_TOP, dragStartTopRef.current + g.dy),
          );
          top.setValue(next);
        },
        onPanResponderRelease: (_, g) => {
          // Direction: a flick wins over position. Otherwise snap to nearest.
          let snapTo: number;
          if (g.vy < -FLICK_VELOCITY) snapTo = MIN_TOP;
          else if (g.vy > FLICK_VELOCITY) snapTo = initialTop;
          else
            snapTo =
              currentTopRef.current < (MIN_TOP + initialTop) / 2
                ? MIN_TOP
                : initialTop;

          Animated.spring(top, {
            toValue: snapTo,
            velocity: g.vy,
            useNativeDriver: false,
            ...SHEET_SPRING,
          }).start();
        },
        onPanResponderTerminate: () => {
          // Lost the gesture (e.g. parent claimed it) — settle to nearest.
          const snapTo =
            currentTopRef.current < (MIN_TOP + initialTop) / 2
              ? MIN_TOP
              : initialTop;
          Animated.spring(top, {
            toValue: snapTo,
            useNativeDriver: false,
            ...SHEET_SPRING,
          }).start();
        },
      }),
    [initialTop, top],
  );

  return (
    <Animated.View style={[s.sheet, { top }]}>
      <OrderHistoryDragHandle panHandlers={responder.panHandlers}>
        <OrderHistoryHandleBar />
      </OrderHistoryDragHandle>
      <OrderHistoryContents
        onShipmentRated={onShipmentRated}
        hiddenShipmentImageId={hiddenShipmentImageId}
      />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  dragHandle: {
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleBar: {
    width: 32,
    height: 4,
    borderRadius: 9999,
    backgroundColor: '#D0D4DD',
  },
});
