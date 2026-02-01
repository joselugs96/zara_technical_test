import { render, screen, fireEvent } from '@testing-library/react';
import PhoneInfo from '@/features/phone-detail/components/PhoneInfo';
import { PhoneDetail } from '@/features/phone-detail/lib/types';
import { useRouter } from 'next/navigation';
import { useCart } from '@/shared/context/CartContext';
import { LoadingProvider } from '@/shared/context/LoadingContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/shared/context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/shared/lib/routes', () => ({
  ROUTES: {
    cart: '/cart',
  },
}));

describe('PhoneInfo', () => {
  const mockPhone: PhoneDetail = {
    id: 'SMG-A25',
    brand: 'Samsung',
    name: 'Galaxy A25 5G',
    description:
      'El Samsung Galaxy A25 5G es un smartphone de gama media con una pantalla FHD+ de 6.5 pulgadas, procesador Exynos 1280 Octa-Core, y una potente batería de 5000mAh, ofreciendo un rendimiento equilibrado y una experiencia 5G asequible.',
    basePrice: 239,
    rating: 4.3,
    specs: {
      screen: '6.5" FHD+',
      resolution: '1080 x 2340 pixels',
      processor: 'Samsung Exynos 1280 Octa-Core',
      mainCamera:
        '50 MP (F1.8) Principal, OIS + 8 MP (F2.2) Ultra gran angular + 2 MP (F2.4) Macro',
      selfieCamera: '13 MP',
      battery: '5000 mAh',
      os: 'Android 14',
      screenRefreshRate: '120 Hz',
    },
    colorOptions: [
      {
        name: 'Negro',
        hexCode: '#000000',
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp',
      },
      {
        name: 'Azul',
        hexCode: '#0000FF',
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-azul.webp',
      },
      {
        name: 'Amarillo',
        hexCode: '#FFFF00',
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-amarillo.webp',
      },
    ],
    storageOptions: [
      { capacity: '128 GB', price: 219 },
      { capacity: '256 GB', price: 239 },
    ],
    similarProducts: [],
  };

  const mockPush = jest.fn();
  const mockAddItem = jest.fn();
  const mockOnColorChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useCart as jest.Mock).mockReturnValue({ addItem: mockAddItem });
  });

  describe('Rendering', () => {
    it('should render section with productInfo class', () => {
      const { container } = render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const section = container.querySelector('section.productInfo');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Storage Selection', () => {
    it('should select storage option on click', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      fireEvent.click(storageButton);

      expect(storageButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should mark selected storage with active class', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      fireEvent.click(storageButton);

      expect(storageButton).toHaveClass('active');
    });

    it('should update price when storage option is selected', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storage256Button = screen.getByRole('button', {
        name: /256 GB storage option/i,
      });
      fireEvent.click(storage256Button);

      expect(screen.getByText('239')).toBeInTheDocument();
    });

    it('should toggle storage selection', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storage128Button = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const storage256Button = screen.getByRole('button', {
        name: /256 GB storage option/i,
      });

      fireEvent.click(storage128Button);
      expect(storage128Button).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(storage256Button);
      expect(storage256Button).toHaveAttribute('aria-pressed', 'true');
      expect(storage128Button).toHaveAttribute('aria-pressed', 'false');
    });

    it('should use storage option price when selected', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storage128Button = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      fireEvent.click(storage128Button);

      expect(screen.getByText('219')).toBeInTheDocument();
    });
  });

  describe('Color Selection', () => {
    it('should select color option on click', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const colorButton = screen.getByLabelText('Color: Azul');
      fireEvent.click(colorButton);

      expect(colorButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Add to Cart Button', () => {
    it('should disable add to cart button initially', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const addButton = screen.getByRole('button', { name: 'ADD TO CART' });
      expect(addButton).toBeDisabled();
      expect(addButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('should enable button when both storage and color are selected', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'ADD TO CART' });

      fireEvent.click(storageButton);
      expect(addButton).toBeDisabled();

      fireEvent.click(colorButton);
      expect(addButton).not.toBeDisabled();
      expect(addButton).toHaveAttribute('aria-disabled', 'false');
    });

    it('should not enable button if only storage is selected', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const addButton = screen.getByRole('button', { name: 'ADD TO CART' });

      fireEvent.click(storageButton);

      expect(addButton).toBeDisabled();
    });

    it('should not enable button if only color is selected', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'ADD TO CART' });

      fireEvent.click(colorButton);

      expect(addButton).toBeDisabled();
    });
  });

  describe('Add to Cart Functionality', () => {
    it('should add item to cart with correct data', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'ADD TO CART' });

      fireEvent.click(storageButton);
      fireEvent.click(colorButton);
      fireEvent.click(addButton);

      expect(mockAddItem).toHaveBeenCalledWith({
        id: 'SMG-A25',
        name: 'Galaxy A25 5G',
        price: 219,
        color: 'Negro',
        storage: '128 GB',
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp',
      });
    });

    it('should redirect to cart after adding item', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'ADD TO CART' });

      fireEvent.click(storageButton);
      fireEvent.click(colorButton);
      fireEvent.click(addButton);

      expect(mockPush).toHaveBeenCalledWith('/cart');
    });

    it('should use selected color image URL', () => {
      render(
        <LoadingProvider>
          <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
        </LoadingProvider>
      );

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Azul');
      const addButton = screen.getByRole('button', { name: 'ADD TO CART' });

      fireEvent.click(storageButton);
      fireEvent.click(colorButton);
      fireEvent.click(addButton);

      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-azul.webp',
        })
      );
    });
  });
});
