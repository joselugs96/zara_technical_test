import { render, screen } from '@testing-library/react';
import PhoneGallery from '@/features/phone-detail/components/PhoneGallery';

// 🔹 Mock de next/image (imprescindible)
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

describe('PhoneGallery', () => {
  const baseProps = {
    imageUrl: 'https://image.test/phone.webp',
    brand: 'Samsung',
    name: 'Galaxy S24',
  };

  it('renders the product image with correct alt text', () => {
    render(<PhoneGallery {...baseProps} />);

    expect(
      screen.getByAltText('Samsung Galaxy S24 - Product view')
    ).toBeInTheDocument();
  });

  it('renders figure with correct aria-label', () => {
    render(<PhoneGallery {...baseProps} />);

    expect(
      screen.getByLabelText('Samsung Galaxy S24 product image')
    ).toBeInTheDocument();
  });

  it('applies default image class for non-Redmi and non-iPhone devices', () => {
    const { container } = render(<PhoneGallery {...baseProps} />);

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageDefault');
  });

  it('applies Redmi image class when brand includes Xiaomi', () => {
    const { container } = render(
      <PhoneGallery {...baseProps} brand="Xiaomi" name="Redmi Note 13" />
    );

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageRedmi');
  });

  it('applies Redmi image class when name includes Redmi', () => {
    const { container } = render(
      <PhoneGallery {...baseProps} brand="Poco" name="Poco X6 Redmi" />
    );

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageRedmi');
  });

  it('applies iPhone image class when brand includes Apple', () => {
    const { container } = render(
      <PhoneGallery {...baseProps} brand="Apple" name="iPhone 15" />
    );

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageIPhone');
  });

  it('applies iPhone image class when name includes iPhone', () => {
    const { container } = render(
      <PhoneGallery {...baseProps} brand="Apple" name="iPhone SE" />
    );

    const image = container.querySelector('img');
    expect(image).toHaveClass('phoneImageIPhone');
  });
});
