import { render, screen, fireEvent } from '@testing-library/react';
import CartGrid from '@/features/cart/components/CartGrid';
import { CartItem } from '@/shared/lib/types';

const mockRemoveItem = jest.fn();

jest.mock('@/shared/context/CartContext', () => ({
  useCart: () => ({
    removeItem: mockRemoveItem,
    totalItems: 2,
  }),
}));

jest.mock('@/features/cart/components/CartItem', () => {
  return function MockCartItem({
    item,
    onRemove,
  }: {
    item: CartItem;
    onRemove: () => void;
  }) {
    return (
      <div>
        <span>{item.name}</span>
        <button onClick={onRemove}>Remove</button>
      </div>
    );
  };
});

describe('CartGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty cart state correctly', () => {
    render(<CartGrid items={[]} />);

    expect(
      screen.getByRole('heading', { name: /cart \(0\)/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('renders cart with items and total count', () => {
    const items: CartItem[] = [
      {
        id: '1',
        name: 'iPhone 15',
        price: 1200,
        quantity: 1,
        color: 'black',
        storage: '128GB',
        imageUrl: 'img',
      },
      {
        id: '2',
        name: 'Pixel 8',
        price: 900,
        quantity: 1,
        color: 'blue',
        storage: '256GB',
        imageUrl: 'img',
      },
    ];

    render(<CartGrid items={items} />);

    expect(
      screen.getByRole('heading', { name: /cart \(2\)/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('list', { name: /cart items list/i })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Pixel 8')).toBeInTheDocument();
  });

  it('calls removeItem with correct payload when removing an item', () => {
    const items: CartItem[] = [
      {
        id: '1',
        name: 'iPhone 15',
        price: 1200,
        color: 'black',
        storage: '128GB',
        quantity: 1,
        imageUrl: 'img',
      },
    ];

    render(<CartGrid items={items} />);

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalledWith({
      id: '1',
      color: 'black',
      storage: '128GB',
    });
  });

  it('has correct accessibility attributes for cart section', () => {
    render(<CartGrid items={[]} />);

    expect(
      screen.getByRole('region', { name: /shopping cart/i })
    ).toBeInTheDocument();
  });
});
