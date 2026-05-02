import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageSourcePropType } from 'react-native';
import ProductImageStack from './ProductImageStack';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import { Marketplace } from './MarketplaceTag';
import { fonts } from '../fonts';

// ── Status tag (e.g. "On time" green pill) ───────────────────────────────
export type StatusTagTone = 'success' | 'warning' | 'danger';

const STATUS_COLORS: Record<StatusTagTone, string> = {
  success: '#0F8857',
  warning: '#A86200',
  danger: '#C42026',
};

function OrderStatusTagText({ label, tone }: { label: string; tone: StatusTagTone }) {
  return <Text style={[s.statusTagText, { color: STATUS_COLORS[tone] }]}>{label}</Text>;
}

function StatusTag({ label, tone }: { label: string; tone: StatusTagTone }) {
  return <OrderStatusTagText label={label} tone={tone} />;
}

// ── Status row: "Processing · On time" ───────────────────────────────────
function OrderProcessingLabel({ label }: { label: string }) {
  return <Text style={s.processingLabel}>{label}</Text>;
}

function OrderStatusSeparator() {
  return <View style={s.statusSeparator} />;
}

function OrderStatusRow({
  status,
  statusTag,
}: {
  status: string;
  statusTag: { label: string; tone: StatusTagTone };
}) {
  return (
    <View style={s.statusRow}>
      <OrderProcessingLabel label={status} />
      <OrderStatusSeparator />
      <StatusTag label={statusTag.label} tone={statusTag.tone} />
    </View>
  );
}

// ── Title + status column ────────────────────────────────────────────────
function OrderArrivalDate({ text }: { text: string }) {
  return (
    <Text style={s.arrivalDate} numberOfLines={1}>
      {text}
    </Text>
  );
}

function OrderInfoColumn({
  arrivingRange,
  status,
  statusTag,
}: {
  arrivingRange: string;
  status: string;
  statusTag: { label: string; tone: StatusTagTone };
}) {
  return (
    <View style={s.infoColumn}>
      <OrderArrivalDate text={arrivingRange} />
      <OrderStatusRow status={status} statusTag={statusTag} />
    </View>
  );
}

// ── Open-order chevron button ────────────────────────────────────────────
function OpenOrderButton({ onPress }: { onPress?: () => void }) {
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

// ── Card ─────────────────────────────────────────────────────────────────
export interface ActiveOrder {
  id: string;
  arrivingRange: string;
  status: string;
  statusTag: { label: string; tone: StatusTagTone };
  productImage: ImageSourcePropType;
  marketplace: Marketplace;
}

export default function ActiveOrderCard({
  order,
  onPress,
}: {
  order: ActiveOrder;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.card, pressed && { opacity: 0.95 }]}
    >
      <ProductImageStack source={order.productImage} marketplace={order.marketplace} />
      <OrderInfoColumn
        arrivingRange={order.arrivingRange}
        status={order.status}
        statusTag={order.statusTag}
      />
      <OpenOrderButton onPress={onPress} />
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  infoColumn: {
    flex: 1,
    gap: 4,
  },
  arrivalDate: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.15,
    color: '#1D2539',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  processingLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.1,
    color: '#475067',
  },
  statusSeparator: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#475067',
  },
  statusTagText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.1,
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
});
