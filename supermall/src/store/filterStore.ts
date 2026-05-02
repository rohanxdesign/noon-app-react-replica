import { create } from 'zustand';

interface FilterStore {
  category: string | null;
  priceRange: [number, number];
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest';
  colors: string[];
  sizes: string[];
  setCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: FilterStore['sortBy']) => void;
  toggleColor: (color: string) => void;
  toggleSize: (size: string) => void;
  resetFilters: () => void;
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 10000];

export const useFilterStore = create<FilterStore>((set) => ({
  category: null,
  priceRange: DEFAULT_PRICE_RANGE,
  sortBy: 'relevance',
  colors: [],
  sizes: [],

  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSortBy: (sortBy) => set({ sortBy }),

  toggleColor: (color) =>
    set((state) => ({
      colors: state.colors.includes(color)
        ? state.colors.filter((c) => c !== color)
        : [...state.colors, color],
    })),

  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size],
    })),

  resetFilters: () =>
    set({ category: null, priceRange: DEFAULT_PRICE_RANGE, sortBy: 'relevance', colors: [], sizes: [] }),
}));
