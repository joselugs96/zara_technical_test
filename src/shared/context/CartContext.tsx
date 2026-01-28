'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  CartItem,
  CartItemKey,
  CartContextType,
  CartAction,
} from '@/shared/lib/types';

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'zara_cart';

const isSameItem = (a: CartItemKey, b: CartItemKey) =>
  a.id === b.id && a.color === b.color && a.storage === b.storage;

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find((item) =>
        isSameItem(item, action.payload)
      );

      if (existingItem) {
        return state.map((item) =>
          isSameItem(item, existingItem)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'REMOVE_ITEM':
      return state.filter((item) => !isSameItem(item, action.payload));

    case 'LOAD_FROM_STORAGE':
      return action.payload;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem: (item: Omit<CartItem, 'quantity'>) =>
        dispatch({ type: 'ADD_ITEM', payload: item }),
      removeItem: (key: CartItemKey) =>
        dispatch({ type: 'REMOVE_ITEM', payload: key }),
      totalItems,
      totalPrice,
      isHydrated,
    }),
    [items, totalItems, totalPrice, isHydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
