import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import StarIcon from '../icons/StarIcon';
import AISpeakIcon from '../icons/AISpeakIcon';
import { fonts } from '../fonts';

interface Props {
  productImage: ImageSourcePropType;
  rating: number;
  ratingColor: string;
  onClose?: () => void;
  // While the morph is flying the image in, we reserve the space but
  // hide the actual photo so the MorphLayer's image owns the visual.
  hideProductImage?: boolean;
}

// ── Product image (84×84 circle, white surface, subtle border) ───────────
function ReviewProductImage({
  source,
  hidden,
}: {
  source: ImageSourcePropType;
  hidden?: boolean;
}) {
  return (
    <View style={s.productImageFrame}>
      {!hidden && (
        <Image source={source} style={s.productImage} resizeMode="cover" />
      )}
    </View>
  );
}

// ── Rating pill (single star + numeric rating) ───────────────────────────
function ReviewRatingNumber({ value }: { value: number }) {
  return <Text style={s.ratingNumber}>{value}</Text>;
}

function ReviewRatingPill({ rating, color }: { rating: number; color: string }) {
  return (
    <View style={s.ratingPill}>
      <StarIcon size={16} fill={color} stroke={color} />
      <ReviewRatingNumber value={rating} />
    </View>
  );
}

// ── Combined product + rating cluster ────────────────────────────────────
function ProductAndRating({
  source,
  rating,
  color,
  hideImage,
}: {
  source: ImageSourcePropType;
  rating: number;
  color: string;
  hideImage?: boolean;
}) {
  return (
    <View style={s.productAndRating}>
      <ReviewProductImage source={source} hidden={hideImage} />
      <View style={s.ratingPillSlot}>
        <ReviewRatingPill rating={rating} color={color} />
      </View>
    </View>
  );
}

// ── Question prompt ──────────────────────────────────────────────────────
function ReviewQuestion() {
  return (
    <Text style={s.question}>
      What did you like most{'\n'}about this product?
    </Text>
  );
}

// ── Input container (placeholder for now) ────────────────────────────────
function ReviewInputPlaceholder() {
  return <Text style={s.inputPlaceholder}>Start typing here</Text>;
}

function ReviewInputContainer() {
  return (
    <View style={s.inputContainer}>
      <View style={s.inputArea}>
        <ReviewInputPlaceholder />
      </View>
    </View>
  );
}

// ── Buttons row ──────────────────────────────────────────────────────────
function SpeakReviewButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.speakBtnWrap, pressed && { opacity: 0.85 }]}
    >
      <LinearGradient
        colors={['#7C3AED', '#5B5BD6', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.speakBtn}
      >
        <AISpeakIcon size={16} />
        <Text style={s.speakBtnLabel}>Speak your review</Text>
      </LinearGradient>
    </Pressable>
  );
}

function NextButton({ enabled, onPress }: { enabled: boolean; onPress?: () => void }) {
  return (
    <Pressable
      onPress={enabled ? onPress : undefined}
      style={({ pressed }) => [
        s.nextBtn,
        pressed && enabled && { opacity: 0.7 },
      ]}
    >
      <Text style={[s.nextLabel, !enabled && s.nextLabelDisabled]}>Next</Text>
    </Pressable>
  );
}

function ReviewActionButtons() {
  return (
    <View style={s.actionRow}>
      <SpeakReviewButton />
      <NextButton enabled={false} />
    </View>
  );
}

// ── Screen ───────────────────────────────────────────────────────────────
export default function ReviewEntryScreen({
  productImage,
  rating,
  ratingColor,
  onClose,
  hideProductImage,
}: Props) {
  return (
    <View style={s.screen}>
      <LinearGradient
        colors={['#FFFFFF', '#F2F3F7']}
        locations={[0, 0.42]}
        style={StyleSheet.absoluteFillObject}
      />
      <Header variant="default" onLeftPress={onClose} />
      <View style={s.body}>
        <ProductAndRating
          source={productImage}
          rating={rating}
          color={ratingColor}
          hideImage={hideProductImage}
        />
        <ReviewQuestion />
        <ReviewInputContainer />
        <ReviewActionButtons />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 6,
    gap: 16,
  },
  // Product + rating
  productAndRating: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  productImageFrame: {
    width: 84,
    height: 84,
    borderRadius: 9999,
    borderWidth: 0.75,
    borderColor: '#F2F3F7',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  ratingPillSlot: {
    marginTop: -10,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2F3F7',
    borderRadius: 9999,
  },
  ratingNumber: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#1D2539',
  },
  // Question
  question: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.15,
    color: '#1D2539',
    textAlign: 'center',
  },
  // Input
  inputContainer: {
    height: 194,
    backgroundColor: '#F2F3F7',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  inputArea: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    borderRadius: 16,
    padding: 12,
  },
  inputPlaceholder: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: '#666D85',
  },
  // Buttons
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  speakBtnWrap: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  speakBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 36,
  },
  speakBtnLabel: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  nextBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    minHeight: 36,
    borderRadius: 8,
    backgroundColor: '#F9F9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextLabel: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: '#1D2539',
  },
  nextLabelDisabled: {
    color: '#989FB3',
  },
});
