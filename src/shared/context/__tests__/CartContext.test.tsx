import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/shared/context/CartContext';
import { CartItem } from '@/shared/lib/types';

function TestComponent() {
  const { items, addItem, removeItem, totalItems, totalPrice } = useCart();

  return (
    <div>
      <span data-testid="total-items">{totalItems}</span>
      <span data-testid="total-price">{totalPrice}</span>

      <button
        onClick={() =>
          addItem({
            id: '1',
            name: 'iPhone',
            price: 1000,
            color: 'black',
            storage: '128GB',
            imageUrl: 'img',
          })
        }
      >
        Add iPhone
      </button>

      <button
        onClick={() =>
          removeItem({
            id: '1',
            color: 'black',
            storage: '128GB',
          })
        }
      >
        Remove iPhone
      </button>

      <ul>
        {items.map((item) => (
          <li key={`${item.id}-${item.color}-${item.storage}`}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws error when useCart is used outside CartProvider', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useCart must be used within a CartProvider'
    );
  });

  it('adds a new item to the cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add iPhone'));

    expect(screen.getByText('iPhone x 1')).toBeInTheDocument();
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('1000');
  });

  it('increments quantity when adding the same item again', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add iPhone'));
    fireEvent.click(screen.getByText('Add iPhone'));

    expect(screen.getByText('iPhone x 2')).toBeInTheDocument();
    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('2000');
  });

  it('removes item from the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add iPhone'));
    fireEvent.click(screen.getByText('Remove iPhone'));

    expect(screen.queryByText(/iPhone x/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
  });

  it('loads items from localStorage on mount', async () => {
    const storedItems: CartItem[] = [
      {
        id: '2',
        name: 'Pixel',
        price: 900,
        color: 'white',
        storage: '256GB',
        imageUrl: 'img',
        quantity: 2,
      },
    ];

    localStorage.setItem('zara_cart', JSON.stringify(storedItems));

    await act(async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      );
    });

    expect(screen.getByText('Pixel x 2')).toBeInTheDocument();
    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('1800');
  });

  it('persists cart changes to localStorage', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add iPhone'));

    const stored = JSON.parse(localStorage.getItem('zara_cart') || '[]');

    expect(stored).toHaveLength(1);
    expect(stored[0].quantity).toBe(1);
  });
});
