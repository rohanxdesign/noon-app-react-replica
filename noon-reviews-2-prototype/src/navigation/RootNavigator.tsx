import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  Animated,
  Easing,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from '../theme';
import OrdersScreen from '../screens/OrdersScreen';
import ReviewEntryScreen from '../screens/ReviewEntryScreen';
import MorphLayer from '../components/MorphLayer';
import { colorForRating } from '../utils/ratingColors';
import type { SourceRect } from '../components/ShipmentCard';

export type Screen =
  | 'orders'
  | 'review-text'
  | 'review-voice'
  | 'review-photos'
  | 'review-camera'
  | 'review-success';

export interface ReviewSubject {
  shipmentId: string;
  productImage: ImageSourcePropType;
  productName: string;
  rating: number;
}

interface NavContextValue {
  screen: Screen;
  go: (s: Screen) => void;
  startReview: (subject: ReviewSubject, sourceWindowRect: SourceRect | null) => void;
  closeReview: () => void;
  reviewSubject: ReviewSubject | null;
  hiddenShipmentImageId: string | null;
}

export const NavContext = React.createContext<NavContextValue>({
  screen: 'orders',
  go: () => {},
  startReview: () => {},
  closeReview: () => {},
  reviewSubject: null,
  hiddenShipmentImageId: null,
});

export const useNav = () => React.useContext(NavContext);

// Target rect for the hero product image on ReviewEntryScreen.
// header (status bar 44 + row 56 = 100) + body paddingTop 6, centered 84×84
const TARGET_RECT: SourceRect = {
  x: (375 - 84) / 2,
  y: 100 + 6,
  width: 84,
  height: 84,
};

const FADE_MS = 600; // chrome cross-fade duration (sub-set of morph)

export default function RootNavigator() {
  const [screen, setScreen] = useState<Screen>('orders');
  const [reviewSubject, setReviewSubject] = useState<ReviewSubject | null>(null);
  const [sourceRect, setSourceRect] = useState<SourceRect | null>(null);
  const [morphing, setMorphing] = useState(false);
  const [hiddenShipmentImageId, setHiddenShipmentImageId] = useState<string | null>(null);

  // Phone viewport ref so we can convert window-coords → viewport-coords
  // for measureInWindow callers downstream.
  const viewportRef = useRef<View>(null);
  const viewportOriginRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const measure = () => {
      viewportRef.current?.measureInWindow((x, y) => {
        viewportOriginRef.current = { x, y };
      });
    };
    measure();
    if (Platform.OS === 'web') {
      window.addEventListener('resize', measure);
      window.addEventListener('scroll', measure, { passive: true });
      // Re-measure shortly after mount in case layout settled late.
      const tid = setTimeout(measure, 100);
      return () => {
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure);
        clearTimeout(tid);
      };
    }
  }, []);

  // Cross-fade between screens (chrome only — product image is in MorphLayer).
  const crossfade = useRef(new Animated.Value(0)).current;

  const animateCrossfade = useCallback(
    (to: 0 | 1, duration = FADE_MS) =>
      new Promise<void>(resolve => {
        Animated.timing(crossfade, {
          toValue: to,
          duration,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }).start(() => resolve());
      }),
    [crossfade],
  );

  const go = useCallback((s: Screen) => setScreen(s), []);

  const startReview = useCallback(
    (subject: ReviewSubject, sourceWindowRect: SourceRect | null) => {
      setReviewSubject(subject);

      if (sourceWindowRect) {
        const o = viewportOriginRef.current;
        const localRect: SourceRect = {
          x: sourceWindowRect.x - o.x,
          y: sourceWindowRect.y - o.y,
          width: sourceWindowRect.width,
          height: sourceWindowRect.height,
        };
        setSourceRect(localRect);
        setHiddenShipmentImageId(subject.shipmentId);
        setMorphing(true);
        // Mount review screen now (with hidden hero image), kick chrome cross-fade.
        setScreen('review-text');
        animateCrossfade(1);
      } else {
        // Fallback: no source rect → straight cross-fade.
        setScreen('review-text');
        animateCrossfade(1);
      }
    },
    [animateCrossfade],
  );

  const closeReview = useCallback(() => {
    animateCrossfade(0).then(() => {
      setScreen('orders');
      // Keep subject around momentarily for back-transition aesthetics.
      setTimeout(() => {
        setReviewSubject(null);
        setSourceRect(null);
        setHiddenShipmentImageId(null);
      }, 50);
    });
  }, [animateCrossfade]);

  const onMorphComplete = useCallback(() => {
    setMorphing(false);
    setSourceRect(null);
    setHiddenShipmentImageId(null);
  }, []);

  const value = useMemo(
    () => ({
      screen,
      go,
      startReview,
      closeReview,
      reviewSubject,
      hiddenShipmentImageId,
    }),
    [screen, go, startReview, closeReview, reviewSubject, hiddenShipmentImageId],
  );

  // Crossfade interpolations (chrome only).
  const ordersOpacity = crossfade.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const reviewOpacity = crossfade;

  return (
    <NavContext.Provider value={value}>
      <View ref={viewportRef} collapsable={false} style={styles.root}>
        <Animated.View
          style={[StyleSheet.absoluteFillObject, { opacity: ordersOpacity }]}
          pointerEvents={screen === 'orders' ? 'auto' : 'none'}
        >
          <OrdersScreen />
        </Animated.View>

        {reviewSubject && (
          <Animated.View
            style={[StyleSheet.absoluteFillObject, { opacity: reviewOpacity }]}
            pointerEvents={screen === 'review-text' ? 'auto' : 'none'}
          >
            <ReviewEntryScreen
              productImage={reviewSubject.productImage}
              rating={reviewSubject.rating}
              ratingColor={colorForRating(reviewSubject.rating)}
              hideProductImage={morphing}
              onClose={closeReview}
            />
          </Animated.View>
        )}

        {morphing && sourceRect && reviewSubject && (
          <MorphLayer
            productImage={reviewSubject.productImage}
            source={sourceRect}
            target={TARGET_RECT}
            onComplete={onMorphComplete}
          />
        )}
      </View>
    </NavContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    overflow: 'hidden',
  },
});
