export interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  storage: string;
  quantity: number;
}

export type CartItemKey = Pick<CartItem, 'id' | 'color' | 'storage'>;

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (key: CartItemKey) => void;
  updateQuantity: (key: CartItemKey, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isHydrated: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: CartItemKey }
  | { type: 'UPDATE_QUANTITY'; payload: CartItemKey & { quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_FROM_STORAGE'; payload: CartItem[] };
