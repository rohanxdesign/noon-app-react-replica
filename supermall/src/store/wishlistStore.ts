import { create } from 'zustand';

export type WishlistMode = 'drawer' | 'page';

interface WishlistStore {
  mode: WishlistMode | null;
  productId: string | null;
  productImage: string | null;
  wishlistedIds: Set<string>;
  openDrawer: (productId: string, productImage?: string) => void;
  openFullWishlist: () => void;
  closeDrawer: () => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  mode: null,
  productId: null,
  productImage: null,
  wishlistedIds: new Set(),
  openDrawer: (productId, productImage) =>
    set({ mode: 'drawer', productId, productImage: productImage ?? null }),
  openFullWishlist: () =>
    set({ mode: 'page', productId: null, productImage: null }),
  closeDrawer: () =>
    set((state) => {
      if (state.mode !== 'drawer') {
        return { mode: null, productId: null, productImage: null };
      }
      const next = new Set(state.wishlistedIds);
      if (state.productId) next.add(state.productId);
      return {
        mode: null,
        productId: null,
        productImage: null,
        wishlistedIds: next,
      };
    }),
}));
