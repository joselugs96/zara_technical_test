import { render, screen, fireEvent, act } from '@testing-library/react';
import CartItem from '@/features/cart/components/CartItem';
import { CartItem as CartItemType } from '@/shared/lib/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, fill, sizes, quality, ...imgProps } = props;
    if (priority) {
      imgProps.loading = 'eager';
    }
    return <img {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

describe('CartItem', () => {
  const baseItem: CartItemType = {
    id: '1',
    name: 'Galaxy S24',
    price: 1200,
    storage: '256GB',
    color: 'Black',
    quantity: 2,
    imageUrl: 'image.webp',
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders cart item information correctly', () => {
    render(<CartItem item={baseItem} onRemove={jest.fn()} />);

    expect(
      screen.getByRole('article', {
        name: /galaxy s24, 256gb, black, 1200 eur, quantity 2/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('256GB')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('1200 EUR')).toBeInTheDocument();
    expect(screen.getByText('X2')).toBeInTheDocument();
  });

  it('renders product image when imageUrl is provided', () => {
    render(<CartItem item={baseItem} onRemove={jest.fn()} />);

    expect(screen.getByAltText('Galaxy S24 - Black')).toBeInTheDocument();
  });

  it('renders placeholder when imageUrl is missing', () => {
    const itemWithoutImage = { ...baseItem, imageUrl: undefined };

    render(<CartItem item={itemWithoutImage} onRemove={jest.fn()} />);

    expect(
      screen.getByRole('img', { name: /no image available/i })
    ).toBeInTheDocument();
  });

  it('applies Redmi image class when item name includes "redmi"', () => {
    const redmiItem = {
      ...baseItem,
      name: 'Redmi Note 13',
    };

    const { container } = render(
      <CartItem item={redmiItem} onRemove={jest.fn()} />
    );

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageRedmi');
  });

  it('disables remove button and calls onRemove after delay', async () => {
    const onRemove = jest.fn();

    render(<CartItem item={baseItem} onRemove={onRemove} />);

    const removeButton = screen.getByRole('button', {
      name: /remove galaxy s24 from cart/i,
    });

    fireEvent.click(removeButton);

    expect(removeButton).toBeDisabled();
    expect(removeButton).toHaveAttribute('aria-disabled', 'true');

    // ⏳ Antes del timeout
    expect(onRemove).not.toHaveBeenCalled();

    // ⏳ Avanzamos el tiempo
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
