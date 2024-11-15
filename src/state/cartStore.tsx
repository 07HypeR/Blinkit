import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: (id: string | number) => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: item => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          cartItem => cartItem?._id === item?._id,
        );
        //WHEN ITEM EXIST
        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            count: updatedCart[existingItemIndex].count + 1,
          };
          set({cart: updatedCart});
        } else {
          set({
            cart: [...currentCart, {_id: item._id, item: item, count: 1}],
          });
        }
      },

      clearCart: () => set({cart: []}),
      removeItem: id => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          cartItem => cartItem?._id === id,
        );

        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart];
          const existingItem = updatedCart[existingItemIndex];

          if (existingItem.count > 1) {
            updatedCart[existingItemIndex] = {
              ...existingItem,
              count: existingItem?.count - 1,
            };
          } else {
            updatedCart.splice(existingItemIndex, 1);
          }

          set({cart: updatedCart});
        }
      },

      getItemCount: id => {
        const currentItem = get().cart.find(cartItem => cartItem._id === id);
        return currentItem ? currentItem?.count : 0;
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, cartItem) => total + cartItem.item.price * cartItem.count,
          0,
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
