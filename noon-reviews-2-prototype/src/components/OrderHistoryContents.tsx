import React from 'react';
import { StyleSheet, View } from 'react-native';
import OrderHistoryTitleAndFilters from './OrderHistoryTitleAndFilters';
import ShipmentsList from './ShipmentsList';
import type { Shipment, SourceRect } from './ShipmentCard';

interface Props {
  onShipmentRated?: (
    shipment: Shipment,
    rating: number,
    sourceRect: SourceRect | null,
  ) => void;
  hiddenShipmentImageId?: string | null;
}

// Title + filters ↑ 16px gap ↓ shipments list, per Figma "Contents" frame.
export default function OrderHistoryContents({
  onShipmentRated,
  hiddenShipmentImageId,
}: Props) {
  return (
    <View style={s.contents}>
      <OrderHistoryTitleAndFilters />
      <ShipmentsList
        onShipmentRated={onShipmentRated}
        hiddenShipmentImageId={hiddenShipmentImageId}
      />
    </View>
  );
}

const s = StyleSheet.create({
  contents: {
    flex: 1,
    flexDirection: 'column',
    gap: 16,
    width: '100%',
  },
});
