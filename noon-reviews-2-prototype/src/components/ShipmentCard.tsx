import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DeliveredTickIcon from '../icons/DeliveredTickIcon';
import RewindCheckIcon from '../icons/RewindCheckIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import RatingInputStars from './RatingInputStars';
import { fonts } from '../fonts';

export interface SourceRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ── Header strip (delivery status + marketplace logo) ────────────────────
function ShipmentDeliveryStatus({ status, dateLabel }: { status: string; dateLabel: string }) {
  return (
    <View style={s.deliveryStatus}>
      <DeliveredTickIcon size={16} />
      <Text style={s.statusText}>
        <Text style={s.statusBadge}>{status}</Text>
        <Text style={s.statusDate}> on {dateLabel}</Text>
      </Text>
    </View>
  );
}

function ShipmentMarketplace({ source }: { source: ImageSourcePropType }) {
  return (
    <Image
      source={source}
      style={{ width: 54, height: 16 }}
      resizeMode="contain"
    />
  );
}

function ShipmentHeader({
  status,
  dateLabel,
  marketplaceSource,
}: {
  status: string;
  dateLabel: string;
  marketplaceSource: ImageSourcePropType;
}) {
  return (
    <View style={s.header}>
      <ShipmentDeliveryStatus status={status} dateLabel={dateLabel} />
      <ShipmentMarketplace source={marketplaceSource} />
    </View>
  );
}

// ── Shipment info row (image + name col + chevron) ───────────────────────
const ShipmentProductImage = React.forwardRef<View, { source: ImageSourcePropType; hidden?: boolean }>(
  ({ source, hidden }, ref) => (
    <View ref={ref} style={[s.productImageFrame, hidden && { opacity: 0 }]}>
      <Image source={source} style={s.productImage} resizeMode="cover" />
    </View>
  ),
);
ShipmentProductImage.displayName = 'ShipmentProductImage';

function ShipmentProductName({ text }: { text: string }) {
  return (
    <Text style={s.productName} numberOfLines={2} ellipsizeMode="tail">
      {text}
    </Text>
  );
}

function ShipmentReturnInfo({ label }: { label: string }) {
  return (
    <LinearGradient
      colors={['#E3FCF2', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={s.returnInfo}
    >
      <RewindCheckIcon size={16} />
      <Text style={s.returnLabel}>{label}</Text>
    </LinearGradient>
  );
}

function ShipmentInfoColumn({
  productName,
  returnLabel,
}: {
  productName: string;
  returnLabel: string;
}) {
  return (
    <View style={s.infoColumn}>
      <ShipmentProductName text={productName} />
      <ShipmentReturnInfo label={returnLabel} />
    </View>
  );
}

function OpenShipmentButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [s.openButton, pressed && { opacity: 0.6 }]}
    >
      <ChevronRightIcon size={16} color="#1D2539" />
    </Pressable>
  );
}

const ShipmentInfoRow = React.forwardRef<
  View,
  {
    productImage: ImageSourcePropType;
    productName: string;
    returnLabel: string;
    onOpenPress?: () => void;
    imageHidden?: boolean;
  }
>(({ productImage, productName, returnLabel, onOpenPress, imageHidden }, imageRef) => (
  <View style={s.infoRow}>
    <ShipmentProductImage ref={imageRef} source={productImage} hidden={imageHidden} />
    <ShipmentInfoColumn productName={productName} returnLabel={returnLabel} />
    <OpenShipmentButton onPress={onOpenPress} />
  </View>
));
ShipmentInfoRow.displayName = 'ShipmentInfoRow';

// ── Divider (dotted) ─────────────────────────────────────────────────────
function ShipmentDivider() {
  return <View style={s.divider} />;
}

// ── Rating row ───────────────────────────────────────────────────────────
function ShipmentRatingPrompt() {
  return <Text style={s.ratingPrompt}>What would you rate it?</Text>;
}

function ShipmentRatingRow({
  rating,
  onRate,
  onRateSettled,
}: {
  rating: number;
  onRate: (rating: number) => void;
  onRateSettled?: (rating: number) => void;
}) {
  return (
    <View style={s.ratingRow}>
      <ShipmentRatingPrompt />
      <RatingInputStars
        rating={rating}
        onRate={onRate}
        onRateSettled={onRateSettled}
      />
    </View>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────
export interface Shipment {
  id: string;
  status: string;                       // e.g. "Delivered"
  dateLabel: string;                    // e.g. "April 16, 2026"
  marketplaceSource: ImageSourcePropType;
  productImage: ImageSourcePropType;
  productName: string;
  returnLabel: string;                  // e.g. "Returnable till Apr 24"
  rating: number;
}

interface Props {
  shipment: Shipment;
  onRate: (rating: number) => void;
  onRateSettled?: (rating: number, sourceRect: SourceRect | null) => void;
  onOpenPress?: () => void;
  imageHidden?: boolean;
}

export default function ShipmentCard({
  shipment,
  onRate,
  onRateSettled,
  onOpenPress,
  imageHidden,
}: Props) {
  const imageRef = useRef<View>(null);

  const handleRateSettled = (rating: number) => {
    if (!onRateSettled) return;
    if (imageRef.current && typeof imageRef.current.measureInWindow === 'function') {
      imageRef.current.measureInWindow((x, y, width, height) => {
        onRateSettled(rating, { x, y, width, height });
      });
    } else {
      onRateSettled(rating, null);
    }
  };

  return (
    <View style={s.card}>
      <ShipmentHeader
        status={shipment.status}
        dateLabel={shipment.dateLabel}
        marketplaceSource={shipment.marketplaceSource}
      />
      <View style={s.body}>
        <ShipmentInfoRow
          ref={imageRef}
          productImage={shipment.productImage}
          productName={shipment.productName}
          returnLabel={shipment.returnLabel}
          onOpenPress={onOpenPress}
          imageHidden={imageHidden}
        />
        <ShipmentDivider />
        <ShipmentRatingRow
          rating={shipment.rating}
          onRate={onRate}
          onRateSettled={handleRateSettled}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2F3F7',
    borderRadius: 16,
    overflow: 'hidden',
  },
  // Header strip
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9FB',
    padding: 12,
  },
  deliveryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.1,
  },
  statusBadge: {
    fontFamily: fonts.bold,
    color: '#0F8857',
  },
  statusDate: {
    fontFamily: fonts.medium,
    color: '#1D2539',
  },
  // Body
  body: {
    padding: 12,
    paddingRight: 10,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productImageFrame: {
    width: 60,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
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
  infoColumn: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  productName: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.1,
    color: '#475067',
  },
  returnInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  returnLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.12,
    color: '#0F8857',
  },
  openButton: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  // Divider — dotted, falls back to solid where dashed is unsupported
  divider: {
    height: 0,
    borderTopWidth: 1,
    borderColor: '#EAECF0',
    borderStyle: 'dashed',
    marginHorizontal: 4,
    marginTop: 4,
  },
  // Rating row
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  ratingPrompt: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.1,
    color: '#1D2539',
  },
});
