import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
  Layout,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme';
import { Product, reviewSuggestions } from '../data';
import { useApp } from '../store';
import StarRating from '../components/StarRating';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface WriteReviewScreenProps {
  product: Product;
  rating: number;
  onClose: () => void;
  onAddPhotos: () => void;
  onSubmit: () => void;
  onRatingChange: (rating: number) => void;
}

const SuggestionChip = ({
  label,
  onPress,
  delay,
}: {
  label: string;
  onPress: () => void;
  delay: number;
}) => (
  <Animated.View entering={FadeInDown.delay(delay).springify()}>
    <Pressable style={styles.chip} onPress={onPress}>
      <Text style={styles.chipText}>{label}</Text>
      <Ionicons name="add" size={14} color={colors.blueGray600} />
    </Pressable>
  </Animated.View>
);

// Nora AI typing indicator
const TypingIndicator = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    dot1.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1
    );
    dot2.value = withDelay(
      150,
      withRepeat(
        withSequence(
          withTiming(-6, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1
      )
    );
    dot3.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(-6, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1
      )
    );
  }, []);

  const style1 = useAnimatedStyle(() => ({ transform: [{ translateY: dot1.value }] }));
  const style2 = useAnimatedStyle(() => ({ transform: [{ translateY: dot2.value }] }));
  const style3 = useAnimatedStyle(() => ({ transform: [{ translateY: dot3.value }] }));

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.dot, style1]} />
      <Animated.View style={[styles.dot, style2]} />
      <Animated.View style={[styles.dot, style3]} />
    </View>
  );
};

// Pulsing mic for voice recording
const PulsingMic = () => {
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 2 - pulse.value,
  }));

  return (
    <View style={styles.pulsingMicContainer}>
      <Animated.View style={[styles.pulseRing, pulseStyle]} />
      <View style={styles.micCircle}>
        <Ionicons name="mic" size={28} color={colors.bgWhite} />
      </View>
    </View>
  );
};

export default function WriteReviewScreen({
  product,
  rating,
  onClose,
  onAddPhotos,
  onSubmit,
  onRatingChange,
}: WriteReviewScreenProps) {
  const { currentReview, updateReviewText } = useApp();
  const [reviewText, setReviewText] = useState(currentReview?.reviewText || '');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isNoraWriting, setIsNoraWriting] = useState(false);
  const [noraResult, setNoraResult] = useState('');
  const inputRef = useRef<TextInput>(null);

  const slideUp = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    slideUp.value = withSpring(0, { damping: 20, stiffness: 90 });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideUp.value }],
  }));

  const handleSuggestionPress = useCallback((suggestion: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newText = reviewText ? `${reviewText} ${suggestion}` : suggestion;
    setReviewText(newText);
    updateReviewText(newText);
  }, [reviewText, updateReviewText]);

  const handleTextChange = useCallback((text: string) => {
    setReviewText(text);
    updateReviewText(text);
  }, [updateReviewText]);

  const handleVoicePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!isVoiceMode) {
      setIsVoiceMode(true);
      setIsRecording(true);
      // Simulate voice recording for prototype
      setTimeout(() => {
        setIsRecording(false);
        setVoiceTranscript(
          "Yeah so I bought these headphones and they're actually really great. The noise cancelling is amazing and the battery lasts forever. I use them every day for work calls and music."
        );
        // Simulate Nora AI rewriting
        setIsNoraWriting(true);
        setTimeout(() => {
          setIsNoraWriting(false);
          const polishedReview =
            "These headphones exceeded my expectations! The active noise cancelling is outstanding — perfect for focused work and immersive music sessions. Battery life is exceptional, easily lasting through multiple days of regular use. Highly recommended for anyone looking for premium wireless headphones.";
          setNoraResult(polishedReview);
          setReviewText(polishedReview);
          updateReviewText(polishedReview);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 2500);
      }, 3000);
    } else {
      setIsVoiceMode(false);
      setIsRecording(false);
      setVoiceTranscript('');
      setIsNoraWriting(false);
      setNoraResult('');
    }
  }, [isVoiceMode, updateReviewText]);

  const handleUseNoraResult = useCallback(() => {
    setReviewText(noraResult);
    updateReviewText(noraResult);
    setIsVoiceMode(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [noraResult, updateReviewText]);

  const canSubmit = reviewText.trim().length > 0;

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Handle bar */}
        <View style={styles.handleBar}>
          <View style={styles.handle} />
        </View>

        {/* Header with close */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Write a review</Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={24} color={colors.blueGray800} />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Product summary with rating */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.productSummary}>
            <View style={styles.productInfo}>
              <Animated.Image
                source={{ uri: product.image }}
                style={styles.productThumb}
              />
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
            </View>
            <StarRating
              rating={rating}
              size={28}
              gap={4}
              onRate={onRatingChange}
            />
          </Animated.View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Review text input */}
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.inputSection}>
            <Text style={styles.inputLabel}>Your review</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                style={styles.textInput}
                placeholder="Share your experience with this product..."
                placeholderTextColor={colors.blueGray600}
                multiline
                value={reviewText}
                onChangeText={handleTextChange}
                textAlignVertical="top"
              />
            </View>
          </Animated.View>

          {/* Suggestion chips */}
          <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.suggestionsSection}>
            <Text style={styles.suggestionsLabel}>Quick suggestions</Text>
            <View style={styles.chipsContainer}>
              {reviewSuggestions.map((suggestion, index) => (
                <SuggestionChip
                  key={suggestion}
                  label={suggestion}
                  onPress={() => handleSuggestionPress(suggestion)}
                  delay={450 + index * 50}
                />
              ))}
            </View>
          </Animated.View>

          {/* Nora AI Voice Section */}
          <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.noraSection}>
            <Pressable style={styles.noraButton} onPress={handleVoicePress}>
              <View style={styles.noraIconContainer}>
                <Ionicons
                  name={isVoiceMode ? 'close-circle' : 'mic-circle'}
                  size={32}
                  color={isVoiceMode ? colors.red700 : '#6C5CE7'}
                />
              </View>
              <View style={styles.noraTextContainer}>
                <Text style={styles.noraTitle}>
                  {isVoiceMode ? 'Cancel voice input' : 'Speak to Nora AI'}
                </Text>
                <Text style={styles.noraSubtitle}>
                  {isVoiceMode
                    ? 'Tap to go back to typing'
                    : 'Just talk naturally — AI will write your review'}
                </Text>
              </View>
              {!isVoiceMode && (
                <Ionicons name="chevron-forward" size={20} color={colors.blueGray600} />
              )}
            </Pressable>

            {/* Voice recording state */}
            {isVoiceMode && isRecording && (
              <Animated.View entering={FadeIn.springify()} style={styles.voiceRecordingState}>
                <PulsingMic />
                <Text style={styles.listeningText}>Listening...</Text>
                <Text style={styles.listeningHint}>Speak naturally about your experience</Text>
              </Animated.View>
            )}

            {/* Voice transcript */}
            {isVoiceMode && voiceTranscript && !isNoraWriting && !noraResult && (
              <Animated.View entering={FadeInDown.springify()} style={styles.transcriptContainer}>
                <Text style={styles.transcriptLabel}>What you said:</Text>
                <Text style={styles.transcriptText}>"{voiceTranscript}"</Text>
              </Animated.View>
            )}

            {/* Nora AI writing */}
            {isNoraWriting && (
              <Animated.View entering={FadeIn.springify()} style={styles.noraWritingContainer}>
                <View style={styles.noraWritingHeader}>
                  <Ionicons name="sparkles" size={18} color="#6C5CE7" />
                  <Text style={styles.noraWritingText}>Nora AI is writing your review</Text>
                </View>
                <TypingIndicator />
              </Animated.View>
            )}

            {/* Nora AI result */}
            {noraResult && !isNoraWriting && (
              <Animated.View entering={FadeInDown.springify()} style={styles.noraResultContainer}>
                <View style={styles.noraResultHeader}>
                  <Ionicons name="sparkles" size={16} color="#6C5CE7" />
                  <Text style={styles.noraResultLabel}>Nora AI's review</Text>
                </View>
                <Text style={styles.noraResultText}>"{noraResult}"</Text>
                <Pressable style={styles.useResultButton} onPress={handleUseNoraResult}>
                  <Text style={styles.useResultText}>Use this review</Text>
                </Pressable>
              </Animated.View>
            )}
          </Animated.View>
        </ScrollView>

        {/* Bottom action buttons */}
        <Animated.View entering={FadeInUp.delay(600)} style={styles.bottomActions}>
          <Pressable style={styles.addPhotosButton} onPress={onAddPhotos}>
            <Ionicons name="camera-outline" size={20} color={colors.blueGray800} />
            <Text style={styles.addPhotosText}>Add photos</Text>
          </Pressable>
          <Pressable
            style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
            onPress={canSubmit ? onSubmit : undefined}
          >
            <Text style={[styles.submitText, !canSubmit && styles.submitTextDisabled]}>
              Next
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={canSubmit ? '#000' : colors.blueGray600}
            />
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bgWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 200,
  },
  keyboardView: {
    flex: 1,
  },
  handleBar: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.blueGray300,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.blueGray1000,
    letterSpacing: -0.18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productSummary: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  productThumb: {
    width: 48,
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.blueGray200,
    backgroundColor: colors.bgWhite,
  },
  productName: {
    flex: 1,
    fontSize: 13,
    color: colors.blueGray800,
    letterSpacing: -0.12,
    lineHeight: 17,
  },
  divider: {
    height: 1,
    backgroundColor: colors.blueGray200,
    marginVertical: 4,
  },
  inputSection: {
    paddingTop: 16,
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blueGray900,
    letterSpacing: -0.14,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.blueGray300,
    borderRadius: 12,
    backgroundColor: colors.bgPrimary,
  },
  textInput: {
    minHeight: 100,
    maxHeight: 160,
    padding: 12,
    fontSize: 14,
    color: colors.blueGray1000,
    lineHeight: 20,
  },
  suggestionsSection: {
    paddingTop: 16,
    gap: 10,
  },
  suggestionsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.blueGray600,
    letterSpacing: -0.12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.bgPrimary,
    borderWidth: 1,
    borderColor: colors.blueGray300,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipText: {
    fontSize: 13,
    color: colors.blueGray800,
    fontWeight: '500',
  },
  noraSection: {
    paddingTop: 20,
    gap: 12,
  },
  noraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F6FF',
    borderWidth: 1,
    borderColor: '#E8E4F8',
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  noraIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noraTextContainer: {
    flex: 1,
  },
  noraTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.blueGray1000,
    letterSpacing: -0.14,
  },
  noraSubtitle: {
    fontSize: 12,
    color: colors.blueGray600,
    marginTop: 2,
    letterSpacing: -0.12,
  },
  voiceRecordingState: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
  },
  pulsingMicContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
  },
  micCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listeningText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  listeningHint: {
    fontSize: 13,
    color: colors.blueGray600,
  },
  transcriptContainer: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  transcriptLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.blueGray600,
  },
  transcriptText: {
    fontSize: 14,
    color: colors.blueGray800,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  noraWritingContainer: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  noraWritingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noraWritingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C5CE7',
  },
  typingContainer: {
    flexDirection: 'row',
    gap: 6,
    padding: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6C5CE7',
  },
  noraResultContainer: {
    backgroundColor: '#F8F6FF',
    borderRadius: 12,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E8E4F8',
  },
  noraResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noraResultLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  noraResultText: {
    fontSize: 14,
    color: colors.blueGray800,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  useResultButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#6C5CE7',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  useResultText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderTopColor: colors.blueGray200,
    gap: 12,
  },
  addPhotosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.bgPrimary,
    borderWidth: 1,
    borderColor: colors.blueGray300,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },
  addPhotosText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blueGray800,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.noonYellow,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.blueGray200,
  },
  submitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  submitTextDisabled: {
    color: colors.blueGray600,
  },
});
