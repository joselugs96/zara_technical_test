import { render, screen } from '@testing-library/react';
import SimilarProducts from '@/features/phone-detail/components/SimilarProducts';
import { SimilarProduct } from '@/features/phone-detail/lib/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, sizes, ...imgProps } = props;
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

  it('should render section with correct aria-label', () => {
    render(<SimilarProducts products={mockProducts} />);

    const section = screen.getByLabelText('Similar products');
    expect(section).toBeInTheDocument();
  });

  it('should return null when products array is empty', () => {
    const { container } = render(<SimilarProducts products={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('should render title "SIMILAR ITEMS"', () => {
    render(<SimilarProducts products={mockProducts} />);

    expect(screen.getByText('SIMILAR ITEMS')).toBeInTheDocument();
  });

  it('should render h2 element with title', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const h2 = container.querySelector('h2');
    expect(h2).toBeInTheDocument();
    expect(h2?.textContent).toBe('SIMILAR ITEMS');
  });

  it('should render products grid with role="list"', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const grid = container.querySelector('ul[role="list"]');
    expect(grid).toBeInTheDocument();
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

  it('should render all product links with correct hrefs', () => {
    render(<SimilarProducts products={mockProducts} />);

    expect(
      screen.getByRole('link', {
        name: /OPPO Reno 11 F - 269 EUR/i,
      })
    ).toHaveAttribute('href', '/phone/OPP-R11F');

    expect(
      screen.getByRole('link', {
        name: /Samsung Galaxy A05s - 119 EUR/i,
      })
    ).toHaveAttribute('href', '/phone/SMG-A05S');

    expect(
      screen.getByRole('link', {
        name: /Xiaomi Redmi 12 - 117.29 EUR/i,
      })
    ).toHaveAttribute('href', '/phone/XIA-R12');

    expect(
      screen.getByRole('link', {
        name: /Google Pixel 8a - 459 EUR/i,
      })
    ).toHaveAttribute('href', '/phone/GPX-8A');

    expect(
      screen.getByRole('link', {
        name: /OPPO A18 - 99 EUR/i,
      })
    ).toHaveAttribute('href', '/phone/OPP-A18');
  });

  it('should render product brand name', () => {
    render(<SimilarProducts products={mockProducts} />);

    const oppElements = screen.getAllByText('OPPO');
    expect(oppElements.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('Xiaomi')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  it('should render product names', () => {
    render(<SimilarProducts products={mockProducts} />);

    expect(screen.getByText('Reno 11 F')).toBeInTheDocument();
    expect(screen.getByText('Galaxy A05s')).toBeInTheDocument();
    expect(screen.getByText('Redmi 12')).toBeInTheDocument();
    expect(screen.getByText('Pixel 8a')).toBeInTheDocument();
    expect(screen.getByText('A18')).toBeInTheDocument();
  });

  it('should render product prices', () => {
    render(<SimilarProducts products={mockProducts} />);

    expect(screen.getByText('269 EUR')).toBeInTheDocument();
    expect(screen.getByText('119 EUR')).toBeInTheDocument();
    expect(screen.getByText('117.29 EUR')).toBeInTheDocument();
    expect(screen.getByText('459 EUR')).toBeInTheDocument();
    expect(screen.getByText('99 EUR')).toBeInTheDocument();
  });

  it('should render product images with correct src', () => {
    render(<SimilarProducts products={mockProducts} />);

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute(
      'src',
      'http://example.com/oppo-reno.webp'
    );
    expect(images[1]).toHaveAttribute(
      'src',
      'http://example.com/samsung-a05s.webp'
    );
  });

  it('should render product images with correct alt text', () => {
    render(<SimilarProducts products={mockProducts} />);

    expect(screen.getByAltText('Reno 11 F by OPPO')).toBeInTheDocument();
    expect(screen.getByAltText('Galaxy A05s by Samsung')).toBeInTheDocument();
    expect(screen.getByAltText('Redmi 12 by Xiaomi')).toBeInTheDocument();
  });

  it('should apply default image class to non-Redmi products', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const images = container.querySelectorAll('img');
    expect(images[0]).toHaveClass('phoneImageDefault'); // OPPO
    expect(images[1]).toHaveClass('phoneImageDefault'); // Samsung
    expect(images[3]).toHaveClass('phoneImageDefault'); // Google
  });

  it('should apply Redmi image class to Xiaomi products', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const images = container.querySelectorAll('img');
    expect(images[2]).toHaveClass('phoneImageRedmi'); // Xiaomi Redmi 12
  });

  it('should apply Redmi image class when name includes Redmi', () => {
    const productsWithRedmiName: SimilarProduct[] = [
      {
        id: 'OTH-R1',
        brand: 'OtherBrand',
        name: 'Redmi Pro',
        basePrice: 199,
        imageUrl: 'http://example.com/redmi-pro.webp',
      },
    ];

    const { container } = render(
      <SimilarProducts products={productsWithRedmiName} />
    );

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageRedmi');
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

  it('should render article element for each product', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(5);
  });

  it('should render product card with correct link aria-label', () => {
    render(<SimilarProducts products={mockProducts} />);

    const link = screen.getByRole('link', {
      name: /OPPO Reno 11 F - 269 EUR/i,
    });
    expect(link).toHaveAttribute('aria-label', 'OPPO Reno 11 F - 269 EUR');
  });

  it('should have proper CSS classes applied', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const section = container.querySelector('.similarProductsContainer');
    const title = container.querySelector('.title');
    const grid = container.querySelector('.productsGrid');

    expect(section).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(grid).toBeInTheDocument();
  });

  it('should render single product correctly', () => {
    const singleProduct: SimilarProduct[] = [
      {
        id: 'OPP-R11F',
        brand: 'OPPO',
        name: 'Reno 11 F',
        basePrice: 269,
        imageUrl: 'http://example.com/oppo-reno.webp',
      },
    ];

    render(<SimilarProducts products={singleProduct} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    expect(screen.getByText('Reno 11 F')).toBeInTheDocument();
  });

  it('should render products with decimal prices correctly', () => {
    render(<SimilarProducts products={mockProducts} />);

    expect(screen.getByText('117.29 EUR')).toBeInTheDocument();
  });

  it('should have semantic HTML structure', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const section = container.querySelector('section');
    const h2 = container.querySelector('h2');
    const ul = container.querySelector('ul');
    const lis = container.querySelectorAll('li');

    expect(section).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(ul).toBeInTheDocument();
    expect(lis.length).toBeGreaterThan(0);
  });

  it('should render image wrapper div for each product', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const imageWrappers = container.querySelectorAll('.imageWrapper');
    expect(imageWrappers).toHaveLength(5);
  });

  it('should render product info section for each product', () => {
    const { container } = render(<SimilarProducts products={mockProducts} />);

    const productInfos = container.querySelectorAll('.productInfo');
    expect(productInfos).toHaveLength(5);
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
