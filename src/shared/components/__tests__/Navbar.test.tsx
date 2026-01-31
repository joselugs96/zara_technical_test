import { render, screen } from '@testing-library/react';
import Navbar from '@/shared/components/Navbar';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, fill, ...imgProps } = props;
    if (priority) {
      imgProps.loading = 'eager';
    }
    return <img {...imgProps} />;
  },
}));

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

jest.mock('@/shared/lib/routes', () => ({
  ROUTES: {
    home: '/',
    cart: '/cart',
  },
}));

const mockUseCart = jest.fn();

jest.mock('@/shared/context/CartContext', () => ({
  useCart: () => mockUseCart(),
}));

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders main navigation with correct aria-label', () => {
    mockUseCart.mockReturnValue({ totalItems: 0 });

    render(<Navbar />);

    expect(
      screen.getByRole('navigation', { name: /main navigation/i })
    ).toBeInTheDocument();
  });

  it('renders logo link pointing to home', () => {
    mockUseCart.mockReturnValue({ totalItems: 0 });

    render(<Navbar />);

    const homeLink = screen.getByRole('link', {
      name: /zara technical test - home/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders cart link with correct aria-label and count', () => {
    mockUseCart.mockReturnValue({ totalItems: 3 });

    render(<Navbar />);

    const cartLink = screen.getByRole('link', {
      name: /shopping cart with 3 items/i,
    });

    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');

    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByLabelText(/3 items in cart/i)).toBeInTheDocument();
  });

  it('handles singular item count correctly', () => {
    mockUseCart.mockReturnValue({ totalItems: 1 });

    render(<Navbar />);

    expect(
      screen.getByRole('link', {
        name: /shopping cart with 1 item/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/1 items in cart/i)).toBeInTheDocument();
  });

  it('renders both images with correct alt text', () => {
    mockUseCart.mockReturnValue({ totalItems: 0 });

    render(<Navbar />);

    expect(
      screen.getByAltText(/zara technical test logo/i)
    ).toBeInTheDocument();

    expect(screen.getByAltText(/shopping cart icon/i)).toBeInTheDocument();
  });
});
