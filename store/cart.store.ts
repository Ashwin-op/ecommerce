import { IProduct } from '@/models/product';
import { create } from 'zustand';

type CartStore = {
  products: Array<{ product: IProduct; quantity: number }>;
  add: (product: IProduct, quantity?: number) => void;
  remove: (productId: number, quantity?: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  add: (product, quantity = 1) => {
    set((state) => {
      const index = state.products.findIndex((p) => p.product.id === product.id);
      if (index === -1) {
        return { products: [...state.products, { product, quantity }] };
      }
      const products = [...state.products];
      products[index].quantity += quantity;
      return { products };
    });
  },
  remove: (productId, quantity = 1) => {
    set((state) => {
      const index = state.products.findIndex((p) => p.product.id === productId);
      if (index === -1) return state;
      const products = [...state.products];
      products[index].quantity -= quantity;
      if (products[index].quantity <= 0) {
        products.splice(index, 1);
      }
      return { products };
    });
  },
  clear: () => set({ products: [] }),
}));
