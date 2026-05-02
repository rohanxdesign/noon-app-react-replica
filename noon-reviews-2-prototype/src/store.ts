import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, products as initialProducts } from './data';

interface ReviewData {
  productId: string;
  rating: number;
  reviewText: string;
  photos: string[];
  submittedAt?: Date;
}

interface AppState {
  products: Product[];
  currentReview: ReviewData | null;
  reviews: ReviewData[];
}

interface AppContextType extends AppState {
  setRating: (productId: string, rating: number) => void;
  startReview: (productId: string, rating: number) => void;
  updateReviewText: (text: string) => void;
  addPhoto: (uri: string) => void;
  removePhoto: (uri: string) => void;
  submitReview: () => void;
  resetCurrentReview: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentReview, setCurrentReview] = useState<ReviewData | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  const setRating = useCallback((productId: string, rating: number) => {
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, rating } : p
    ));
  }, []);

  const startReview = useCallback((productId: string, rating: number) => {
    setCurrentReview({
      productId,
      rating,
      reviewText: '',
      photos: [],
    });
    setRating(productId, rating);
  }, [setRating]);

  const updateReviewText = useCallback((text: string) => {
    setCurrentReview(prev => prev ? { ...prev, reviewText: text } : null);
  }, []);

  const addPhoto = useCallback((uri: string) => {
    setCurrentReview(prev => prev ? { ...prev, photos: [...prev.photos, uri] } : null);
  }, []);

  const removePhoto = useCallback((uri: string) => {
    setCurrentReview(prev => prev ? { ...prev, photos: prev.photos.filter(p => p !== uri) } : null);
  }, []);

  const submitReview = useCallback(() => {
    if (currentReview) {
      const submitted = { ...currentReview, submittedAt: new Date() };
      setReviews(prev => [...prev, submitted]);
      setProducts(prev => prev.map(p =>
        p.id === currentReview.productId ? { ...p, hasReview: true, rating: currentReview.rating } : p
      ));
    }
  }, [currentReview]);

  const resetCurrentReview = useCallback(() => {
    setCurrentReview(null);
  }, []);

  return React.createElement(AppContext.Provider, {
    value: {
      products,
      currentReview,
      reviews,
      setRating,
      startReview,
      updateReviewText,
      addPhoto,
      removePhoto,
      submitReview,
      resetCurrentReview,
    },
    children,
  });
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
