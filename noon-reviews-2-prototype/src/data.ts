export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  orderId: string;
  status: 'delivered' | 'cancelled' | 'arriving';
  statusDate: string;
  marketplace: 'express' | 'supermall';
  rating?: number;
  hasReview?: boolean;
}

export interface ConfirmedOrder {
  id: string;
  shipmentNumber: string;
  marketplace: 'express';
  arrivingBy: string;
  itemCount: number;
  productImages: string[];
}

export const confirmedOrders: ConfirmedOrder[] = [
  {
    id: 'co1',
    shipmentNumber: '#1278907829',
    marketplace: 'express',
    arrivingBy: 'Mar 14, 2026',
    itemCount: 6,
    productImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop',
    ],
  },
  {
    id: 'co2',
    shipmentNumber: '#1278907829',
    marketplace: 'express',
    arrivingBy: 'Mar 17, 2026',
    itemCount: 6,
    productImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop',
    ],
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Nothing Headphone (1) Wireless Over Ear Headphones with Active Noise Cancelling, Up to 80 Hours of Battery Life, Hi-Res, Spatial Audio, Water Resistance White',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 'dhm458',
    orderId: 'ORD-001',
    status: 'delivered',
    statusDate: 'Mar 14',
    marketplace: 'express',
  },
  {
    id: 'p2',
    name: 'Sunshine Nutrition Omega 3 Fish Oil Dietary Supplement 100 Softgels',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    price: 'dhm56.16',
    orderId: 'ORD-002',
    status: 'delivered',
    statusDate: 'Mar 14',
    marketplace: 'supermall',
  },
  {
    id: 'p3',
    name: 'Nothing Headphone (1) Wireless Over Ear Headphones with Active Noise Cancelling, Up to 80 Hours of Battery Life, Hi-Res, Spatial Audio, Water Resistance White',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 'dhm458',
    orderId: 'ORD-003',
    status: 'cancelled',
    statusDate: 'Mar 12',
    marketplace: 'express',
  },
  {
    id: 'p4',
    name: 'Nothing Headphone (1) Wireless Over Ear Headphones with Active Noise Cancelling, Up to 80 Hours of Battery Life, Hi-Res, Spatial Audio, Water Resistance White',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 'dhm458',
    orderId: 'ORD-004',
    status: 'delivered',
    statusDate: 'Mar 14',
    marketplace: 'express',
  },
];

export const reviewSuggestions = [
  'Great quality!',
  'Value for money',
  'Fast delivery',
  'As described',
  'Would recommend',
  'Exceeded expectations',
];

export const photoGuidelines = [
  'Show the product clearly',
  'Good lighting preferred',
  'Show it in use if possible',
  'Multiple angles help others',
];
