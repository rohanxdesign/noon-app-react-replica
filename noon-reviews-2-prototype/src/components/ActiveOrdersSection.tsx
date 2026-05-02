import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActiveOrderCard, { ActiveOrder } from './ActiveOrderCard';
import { fonts } from '../fonts';

function ActiveOrdersTitle() {
  return <Text style={s.title}>Active</Text>;
}

function ActiveOrdersCountText({ count }: { count: number }) {
  return <Text style={s.countText}>{count}</Text>;
}

function ActiveOrdersCountBadge({ count }: { count: number }) {
  return (
    <View style={s.countBadge}>
      <ActiveOrdersCountText count={count} />
    </View>
  );
}

function ActiveOrdersHeading({ count }: { count: number }) {
  return (
    <View style={s.heading}>
      <ActiveOrdersTitle />
      <ActiveOrdersCountBadge count={count} />
    </View>
  );
}

function ActiveOrdersList({
  orders,
  onOrderPress,
}: {
  orders: ActiveOrder[];
  onOrderPress?: (order: ActiveOrder) => void;
}) {
  return (
    <View style={s.list}>
      {orders.map(order => (
        <ActiveOrderCard
          key={order.id}
          order={order}
          onPress={() => onOrderPress?.(order)}
        />
      ))}
    </View>
  );
}

export default function ActiveOrdersSection({
  orders,
  onOrderPress,
}: {
  orders: ActiveOrder[];
  onOrderPress?: (order: ActiveOrder) => void;
}) {
  if (orders.length === 0) return null;
  return (
    <View style={s.section}>
      <ActiveOrdersHeading count={orders.length} />
      <ActiveOrdersList orders={orders} onOrderPress={onOrderPress} />
    </View>
  );
}

const s = StyleSheet.create({
  section: {
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 4,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.15,
    color: '#1D2539',
  },
  countBadge: {
    backgroundColor: '#0F7EFF',
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 1,
    minWidth: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.1,
    color: '#FFFFFF',
  },
  list: {
    gap: 8,
  },
});
