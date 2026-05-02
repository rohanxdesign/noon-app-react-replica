import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ActiveOrdersSection from '../components/ActiveOrdersSection';
import OrderHistorySheet from '../components/OrderHistorySheet';
import type { ActiveOrder } from '../components/ActiveOrderCard';
import type { Shipment, SourceRect } from '../components/ShipmentCard';
import { useNav } from '../navigation/RootNavigator';
import { colors } from '../theme';

const SAMPLE_ACTIVE_ORDERS: ActiveOrder[] = [
  {
    id: 'ao1',
    arrivingRange: 'Arriving Apr 18 - Apr 21',
    status: 'Processing',
    statusTag: { label: 'On time', tone: 'success' },
    productImage: { uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    marketplace: 'express',
  },
];

export default function OrdersScreen() {
  const { startReview, hiddenShipmentImageId } = useNav();

  const handleShipmentRated = (
    shipment: Shipment,
    rating: number,
    sourceRect: SourceRect | null,
  ) => {
    startReview(
      {
        shipmentId: shipment.id,
        productImage: shipment.productImage,
        productName: shipment.productName,
        rating,
      },
      sourceRect,
    );
  };

  return (
    <View style={s.screen}>
      <Header variant="search" searchPlaceholder="Search all orders" />
      <ActiveOrdersSection orders={SAMPLE_ACTIVE_ORDERS} />
      <OrderHistorySheet
        onShipmentRated={handleShipmentRated}
        hiddenShipmentImageId={hiddenShipmentImageId}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
});
