import { render, screen } from '@testing-library/react';
import PhoneCard from '@/features/phones/components/PhoneCard';
import { PhoneListItem } from '@/features/phones/lib/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, fill, ...imgProps } = props;
    if (priority) {
      imgProps.loading = 'eager';
    }
    return <img {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    'aria-label'?: string;
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
    phoneDetail: (id: string) => `/phone/${id}`,
  },
}));

describe('PhoneCard', () => {
  const mockPhone: PhoneListItem = {
    id: 'SMG-S24U',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    basePrice: 1329,
    imageUrl:
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
  };

  const mockRedmiPhone: PhoneListItem = {
    ...mockPhone,
    id: 'XMI-REDMI13',
    name: 'Redmi Note 13',
    brand: 'Xiaomi',
    imageUrl:
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/redmi-13.webp',
  };

  it('should render phone card with correct information', () => {
    render(<PhoneCard phone={mockPhone} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/phone/SMG-S24U');
    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument();
    expect(screen.getByText('1329 EUR')).toBeInTheDocument();
  });

  it('should render image with correct alt text', () => {
    render(<PhoneCard phone={mockPhone} />);

    const image = screen.getByAltText('Samsung Galaxy S24 Ultra');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp'
    );
  });

  it('should have correct accessibility label', () => {
    render(<PhoneCard phone={mockPhone} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'aria-label',
      'Samsung Galaxy S24 Ultra - 1329 EUR - View details'
    );
  });

  it('should render with Redmi-specific image class for Xiaomi phones', () => {
    const { container } = render(<PhoneCard phone={mockRedmiPhone} />);

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageRedmi');
  });

  it('should render with default image class for non-Redmi phones', () => {
    const { container } = render(<PhoneCard phone={mockPhone} />);

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageDefault');
  });

  it('should identify Redmi phones by name', () => {
    const redmiByName: PhoneListItem = {
      ...mockPhone,
      id: 'POC-F5',
      name: 'Poco F5 Redmi',
      brand: 'Xiaomi',
    };

    const { container } = render(<PhoneCard phone={redmiByName} />);
    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageRedmi');
  });

  it('should be wrapped in an article element', () => {
    const { container } = render(<PhoneCard phone={mockPhone} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('should have correct image priority attribute', () => {
    const { container } = render(<PhoneCard phone={mockPhone} />);

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('loading', 'eager');
  });
});
