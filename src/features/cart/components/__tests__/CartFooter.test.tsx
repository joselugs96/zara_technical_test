import { render, screen } from '@testing-library/react';
import CartFooter from '@/features/cart/components/CartFooter';
import { LoadingProvider } from '@/shared/context/LoadingContext';

jest.mock('next/link', () => {
  return function MockLink({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const mockUseCart = jest.fn();

jest.mock('@/shared/context/CartContext', () => ({
  useCart: () => mockUseCart(),
}));

jest.mock('@/shared/lib/routes', () => ({
  ROUTES: {
    home: '/',
  },
}));

describe('CartFooter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders continue shopping link always', () => {
    mockUseCart.mockReturnValue({
      totalItems: 0,
      totalPrice: 0,
    });

    render(
      <LoadingProvider>
        <CartFooter />
      </LoadingProvider>
    );

    const link = screen.getByRole('link', {
      name: /continue shopping/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('shows total and enables pay button when cart has items', () => {
    mockUseCart.mockReturnValue({
      totalItems: 2,
      totalPrice: 2499,
    });

    render(
      <LoadingProvider>
        <CartFooter />
      </LoadingProvider>
    );

    const totalRegion = screen.getByRole('region', {
      name: /order total/i,
    });

    expect(totalRegion).toBeInTheDocument();
    expect(totalRegion).toHaveAttribute('aria-hidden', 'false');

    expect(screen.getByText('2499.00 EUR')).toBeInTheDocument();

    const payButton = screen.getByRole('button', {
      name: /proceed to payment - total: 2499.00 eur/i,
    });

    expect(payButton).toBeEnabled();
    expect(payButton).toHaveAttribute('aria-disabled', 'false');
  });
});
