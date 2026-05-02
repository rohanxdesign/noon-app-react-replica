export type ProductTag = {
  label: string;
  variant: 'bestseller' | 'new' | 'hot' | 'sale';
};

export interface Product {
  id: string;
  name: string;
  variant: string;
  images: string[];
  sellingPrice: number;
  originalPrice: number;
  currency: string;
  rating: number;
  reviewCount: number;
  tag?: ProductTag;
  deal?: string;
  isSponsored?: boolean;
}

export interface Category {
  id: string;
  label: string;
  image: string;
}
