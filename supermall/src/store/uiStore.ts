import { create } from 'zustand';

interface UIStore {
  cartOpen: boolean;
  menuOpen: boolean;
  activeModal: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleMenu: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cartOpen: false,
  menuOpen: false,
  activeModal: null,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
