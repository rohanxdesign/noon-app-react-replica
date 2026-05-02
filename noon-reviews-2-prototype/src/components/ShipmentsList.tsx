import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ShipmentCard, { Shipment, SourceRect } from './ShipmentCard';

const MARKETPLACE_TAG = require('../../assets/marketplace-tags/marketplace-shipment.png');

const SAMPLE_SHIPMENTS: Shipment[] = [
  {
    id: 'sh1',
    status: 'Delivered',
    dateLabel: 'April 16, 2026',
    marketplaceSource: MARKETPLACE_TAG,
    productImage: { uri: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=240&h=240&fit=crop' },
    productName:
      'Samsung Galaxy A55 5G Dual SIM Smartphone, 8GB RAM, 256GB Storage, Awesome Iceblue',
    returnLabel: 'Returnable till Apr 24',
    rating: 0,
  },
  {
    id: 'sh2',
    status: 'Delivered',
    dateLabel: 'April 12, 2026',
    marketplaceSource: MARKETPLACE_TAG,
    productImage: { uri: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=240&h=240&fit=crop' },
    productName:
      'Apple iPhone 15 Pro Max 256GB Natural Titanium 5G With FaceTime',
    returnLabel: 'Returnable till Apr 20',
    rating: 0,
  },
  {
    id: 'sh3',
    status: 'Delivered',
    dateLabel: 'April 8, 2026',
    marketplaceSource: MARKETPLACE_TAG,
    productImage: { uri: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=240&h=240&fit=crop' },
    productName:
      'LEGO Speed Champions McLaren Solus GT & McLaren F1 LM Building Set 76918',
    returnLabel: 'Returnable till Apr 16',
    rating: 0,
  },
  {
    id: 'sh4',
    status: 'Delivered',
    dateLabel: 'April 3, 2026',
    marketplaceSource: MARKETPLACE_TAG,
    productImage: { uri: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=240&h=240&fit=crop' },
    productName:
      'Logitech MX Master 3S Wireless Performance Mouse with Ultra-Fast Scrolling, Graphite',
    returnLabel: 'Returnable till Apr 11',
    rating: 0,
  },
  {
    id: 'sh5',
    status: 'Delivered',
    dateLabel: 'March 28, 2026',
    marketplaceSource: MARKETPLACE_TAG,
    productImage: { uri: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=240&h=240&fit=crop' },
    productName:
      'Dyson V15 Detect Cordless Vacuum Cleaner with Laser, Yellow/Iron',
    returnLabel: 'Return window closed Apr 5',
    rating: 0,
  },
];

interface Props {
  onShipmentRated?: (
    shipment: Shipment,
    rating: number,
    sourceRect: SourceRect | null,
  ) => void;
  hiddenShipmentImageId?: string | null;
}

export default function ShipmentsList({ onShipmentRated, hiddenShipmentImageId }: Props) {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const handleRate = useCallback(
    (id: string, rating: number) => {
      setRatings(prev => ({ ...prev, [id]: rating }));
    },
    [],
  );

  return (
    <ScrollView
      style={s.scroll}
      contentContainerStyle={s.list}
      showsVerticalScrollIndicator={false}
    >
      {SAMPLE_SHIPMENTS.map(shipment => (
        <ShipmentCard
          key={shipment.id}
          shipment={{ ...shipment, rating: ratings[shipment.id] ?? shipment.rating }}
          onRate={r => handleRate(shipment.id, r)}
          onRateSettled={(r, rect) => onShipmentRated?.(shipment, r, rect)}
          imageHidden={hiddenShipmentImageId === shipment.id}
        />
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
  },
  list: {
    flexDirection: 'column',
    gap: 12,
    paddingBottom: 24,
  },
});
