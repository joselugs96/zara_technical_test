import { render, screen } from '@testing-library/react';
import CartFooter from '@/features/cart/components/CartFooter';

// 🔹 Mocks
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

    render(<CartFooter />);

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

    render(<CartFooter />);

    const totalRegion = screen.getByRole('region', {
      name: /order total/i,
    });

    expect(totalRegion).toBeInTheDocument();
    expect(totalRegion).toHaveAttribute('aria-hidden', 'false');

    expect(screen.getByText('2499 EUR')).toBeInTheDocument();

    const payButton = screen.getByRole('button', {
      name: /proceed to payment - total: 2499 eur/i,
    });

    expect(payButton).toBeEnabled();
    expect(payButton).toHaveAttribute('aria-disabled', 'false');
  });

  it('updates aria-label of pay button based on cart state', () => {
    mockUseCart.mockReturnValue({
      totalItems: 1,
      totalPrice: 999,
    });

    render(<CartFooter />);

    expect(
      screen.getByRole('button', {
        name: /proceed to payment - total: 999 eur/i,
      })
    ).toBeInTheDocument();
  });

  it('has correct accessibility label on footer container', () => {
    mockUseCart.mockReturnValue({
      totalItems: 0,
      totalPrice: 0,
    });

    render(<CartFooter />);

    expect(
      screen.getByLabelText(/cart summary and checkout/i)
    ).toBeInTheDocument();
  });
});
