import { render, screen } from '@testing-library/react';
import SimilarProducts from '@/features/phone-detail/components/SimilarProducts';
import { SimilarProduct } from '@/features/phone-detail/lib/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, sizes, ...imgProps } = props;
    return (
      <img
        alt={String(imgProps.alt) || 'test image'}
        {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
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

describe('SimilarProducts', () => {
  const mockProducts: SimilarProduct[] = [
    {
      id: 'OPP-R11F',
      brand: 'OPPO',
      name: 'Reno 11 F',
      basePrice: 269,
      imageUrl: 'http://example.com/oppo-reno.webp',
    },
    {
      id: 'SMG-A05S',
      brand: 'Samsung',
      name: 'Galaxy A05s',
      basePrice: 119,
      imageUrl: 'http://example.com/samsung-a05s.webp',
    },
    {
      id: 'XIA-R12',
      brand: 'Xiaomi',
      name: 'Redmi 12',
      basePrice: 117.29,
      imageUrl: 'http://example.com/xiaomi-redmi12.webp',
    },
    {
      id: 'GPX-8A',
      brand: 'Google',
      name: 'Pixel 8a',
      basePrice: 459,
      imageUrl: 'http://example.com/google-pixel8a.webp',
    },
    {
      id: 'OPP-A18',
      brand: 'OPPO',
      name: 'A18',
      basePrice: 99,
      imageUrl: 'http://example.com/oppo-a18.webp',
    },
  ];

  it('should return null when products array is empty', () => {
    const { container } = render(<SimilarProducts products={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('should render all products as list items', () => {
    render(<SimilarProducts products={mockProducts} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });

  it('should render product link with correct href', () => {
    render(<SimilarProducts products={mockProducts} />);

    const link = screen.getByRole('link', {
      name: /OPPO Reno 11 F - 269 EUR/i,
    });
    expect(link).toHaveAttribute('href', '/phone/OPP-R11F');
  });

  it('should deduplicate products by id', () => {
    const duplicateProducts: SimilarProduct[] = [
      {
        id: 'OPP-R11F',
        brand: 'OPPO',
        name: 'Reno 11 F',
        basePrice: 269,
        imageUrl: 'http://example.com/oppo-reno.webp',
      },
      {
        id: 'OPP-R11F',
        brand: 'OPPO',
        name: 'Reno 11 F',
        basePrice: 269,
        imageUrl: 'http://example.com/oppo-reno.webp',
      },
      {
        id: 'SMG-A05S',
        brand: 'Samsung',
        name: 'Galaxy A05s',
        basePrice: 119,
        imageUrl: 'http://example.com/samsung-a05s.webp',
      },
    ];

    render(<SimilarProducts products={duplicateProducts} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2); // Only 2 unique products
  });

  it('should detect case-insensitive Xiaomi brand', () => {
    const xiaomiProducts: SimilarProduct[] = [
      {
        id: 'XIA-1',
        brand: 'XIAOMI',
        name: 'Phone',
        basePrice: 199,
        imageUrl: 'http://example.com/xiaomi.webp',
      },
    ];

    const { container } = render(<SimilarProducts products={xiaomiProducts} />);

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageRedmi');
  });

  it('should detect case-insensitive Redmi in name', () => {
    const redmiProducts: SimilarProduct[] = [
      {
        id: 'RED-1',
        brand: 'OtherBrand',
        name: 'REDMI NOTE 13',
        basePrice: 199,
        imageUrl: 'http://example.com/redmi.webp',
      },
    ];

    const { container } = render(<SimilarProducts products={redmiProducts} />);

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageRedmi');
  });
});
