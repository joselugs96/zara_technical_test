import { render, screen, fireEvent } from '@testing-library/react';
import PhoneInfo from '@/features/phone-detail/components/PhoneInfo';
import { PhoneDetail } from '@/features/phone-detail/lib/types';
import { useRouter } from 'next/navigation';
import { useCart } from '@/shared/context/CartContext';

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
        <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
      );

      const section = container.querySelector('section.productInfo');
      expect(section).toBeInTheDocument();
    });

    it('should render phone name as h2', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const heading = screen.getByRole('heading', {
        name: 'Galaxy A25 5G',
        level: 2,
      });
      expect(heading).toBeInTheDocument();
    });

    it('should render storage section with title', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      expect(
        screen.getByText('Storage: How much space do you need?')
      ).toBeInTheDocument();
    });

    it('should render all storage options as buttons', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      expect(
        screen.getByRole('button', { name: /128 GB storage option/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /256 GB storage option/i })
      ).toBeInTheDocument();
    });

    it('should render color section with title', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      expect(
        screen.getByText('Color: Pick your favourite')
      ).toBeInTheDocument();
    });

    it('should render all color option buttons', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      expect(screen.getByLabelText('Color: Negro')).toBeInTheDocument();
      expect(screen.getByLabelText('Color: Azul')).toBeInTheDocument();
      expect(screen.getByLabelText('Color: Amarillo')).toBeInTheDocument();
    });

    it('should render add to cart button', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const button = screen.getByRole('button', { name: 'AÑADIR' });
      expect(button).toBeInTheDocument();
    });

    it('should not render storage section if no storage options', () => {
      const phoneNoStorage: PhoneDetail = {
        ...mockPhone,
        storageOptions: [],
      };

      render(
        <PhoneInfo phone={phoneNoStorage} onColorChange={mockOnColorChange} />
      );

      expect(
        screen.queryByText('Storage: How much space do you need?')
      ).not.toBeInTheDocument();
    });

    it('should not render color section if no color options', () => {
      const phoneNoColor: PhoneDetail = {
        ...mockPhone,
        colorOptions: [],
      };

      render(
        <PhoneInfo phone={phoneNoColor} onColorChange={mockOnColorChange} />
      );

      expect(
        screen.queryByText('Color: Pick your favourite')
      ).not.toBeInTheDocument();
    });
  });

  describe('Storage Selection', () => {
    it('should select storage option on click', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      fireEvent.click(storageButton);

      expect(storageButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should mark selected storage with active class', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      fireEvent.click(storageButton);

      expect(storageButton).toHaveClass('active');
    });

    it('should update price when storage option is selected', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storage256Button = screen.getByRole('button', {
        name: /256 GB storage option/i,
      });
      fireEvent.click(storage256Button);

      expect(screen.getByText('239')).toBeInTheDocument();
    });

    it('should toggle storage selection', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

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
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storage128Button = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      fireEvent.click(storage128Button);

      expect(screen.getByText('219')).toBeInTheDocument();
    });
  });

  describe('Color Selection', () => {
    it('should select color option on click', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const colorButton = screen.getByLabelText('Color: Azul');
      fireEvent.click(colorButton);

      expect(colorButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should mark selected color with active class', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const colorButton = screen.getByLabelText('Color: Negro');
      fireEvent.click(colorButton);

      expect(colorButton).toHaveClass('active');
    });

    it('should call onColorChange callback when color is selected', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const colorButton = screen.getByLabelText('Color: Negro');
      fireEvent.click(colorButton);

      expect(mockOnColorChange).toHaveBeenCalledWith('Negro');
    });

    it('should apply correct hex code to color button style', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const negroButton = screen.getByLabelText('Color: Negro');
      expect(negroButton).toHaveStyle('backgroundColor: #000000');

      const azulButton = screen.getByLabelText('Color: Azul');
      expect(azulButton).toHaveStyle('backgroundColor: #0000FF');

      const amarilloButton = screen.getByLabelText('Color: Amarillo');
      expect(amarilloButton).toHaveStyle('backgroundColor: #FFFF00');
    });

    it('should toggle color selection', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const negroButton = screen.getByLabelText('Color: Negro');
      const azulButton = screen.getByLabelText('Color: Azul');

      fireEvent.click(negroButton);
      expect(negroButton).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(azulButton);
      expect(azulButton).toHaveAttribute('aria-pressed', 'true');
      expect(negroButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have title attribute on color buttons', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const negroButton = screen.getByLabelText('Color: Negro');
      expect(negroButton).toHaveAttribute('title', 'Select Negro color');
    });
  });

  describe('Add to Cart Button', () => {
    it('should disable add to cart button initially', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const addButton = screen.getByRole('button', { name: 'AÑADIR' });
      expect(addButton).toBeDisabled();
      expect(addButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('should enable button when both storage and color are selected', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'AÑADIR' });

      fireEvent.click(storageButton);
      expect(addButton).toBeDisabled();

      fireEvent.click(colorButton);
      expect(addButton).not.toBeDisabled();
      expect(addButton).toHaveAttribute('aria-disabled', 'false');
    });

    it('should not enable button if only storage is selected', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const addButton = screen.getByRole('button', { name: 'AÑADIR' });

      fireEvent.click(storageButton);

      expect(addButton).toBeDisabled();
    });

    it('should not enable button if only color is selected', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'AÑADIR' });

      fireEvent.click(colorButton);

      expect(addButton).toBeDisabled();
    });
  });

  describe('Add to Cart Functionality', () => {
    it('should add item to cart with correct data', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'AÑADIR' });

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
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'AÑADIR' });

      fireEvent.click(storageButton);
      fireEvent.click(colorButton);
      fireEvent.click(addButton);

      expect(mockPush).toHaveBeenCalledWith('/cart');
    });

    it('should use correct price in cart item', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storage256Button = screen.getByRole('button', {
        name: /256 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Azul');
      const addButton = screen.getByRole('button', { name: 'AÑADIR' });

      fireEvent.click(storage256Button);
      fireEvent.click(colorButton);
      fireEvent.click(addButton);

      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          price: 239,
        })
      );
    });

    it('should use selected color image URL', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Azul');
      const addButton = screen.getByRole('button', { name: 'AÑADIR' });

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

    it('should not add to cart if button clicked without selections', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const addButton = screen.getByRole('button', { name: 'AÑADIR' });
      fireEvent.click(addButton);

      expect(mockAddItem).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper group role for storage options', () => {
      const { container } = render(
        <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
      );

      const group = container.querySelector('[role="group"]');
      expect(group).toHaveAttribute('aria-labelledby', 'storage-legend');
    });

    it('should have proper group role for color options', () => {
      const { container } = render(
        <PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />
      );

      const groups = container.querySelectorAll('[role="group"]');
      const colorGroup = groups[1];
      expect(colorGroup).toHaveAttribute('aria-labelledby', 'color-legend');
    });

    it('should have aria-label for storage buttons', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storage128 = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      expect(storage128).toHaveAttribute('aria-label', '128 GB storage option');
    });

    it('should have aria-label for color buttons', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const colorButton = screen.getByLabelText('Color: Negro');
      expect(colorButton).toHaveAttribute('aria-label', 'Color: Negro');
    });

    it('should have aria-pressed for storage buttons', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      expect(storageButton).toHaveAttribute('aria-pressed');
    });

    it('should have aria-pressed for color buttons', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const colorButton = screen.getByLabelText('Color: Negro');
      expect(colorButton).toHaveAttribute('aria-pressed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple storage changes', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storage128 = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const storage256 = screen.getByRole('button', {
        name: /256 GB storage option/i,
      });

      fireEvent.click(storage128);
      expect(screen.getByText('219')).toBeInTheDocument();

      fireEvent.click(storage256);
      expect(screen.getByText('239')).toBeInTheDocument();

      fireEvent.click(storage128);
      expect(screen.getByText('219')).toBeInTheDocument();
    });

    it('should handle multiple color changes', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const negroButton = screen.getByLabelText('Color: Negro');
      const azulButton = screen.getByLabelText('Color: Azul');
      const amarilloButton = screen.getByLabelText('Color: Amarillo');

      fireEvent.click(negroButton);
      expect(mockOnColorChange).toHaveBeenLastCalledWith('Negro');

      fireEvent.click(azulButton);
      expect(mockOnColorChange).toHaveBeenLastCalledWith('Azul');

      fireEvent.click(amarilloButton);
      expect(mockOnColorChange).toHaveBeenLastCalledWith('Amarillo');
    });

    it('should handle adding to cart multiple times', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storageButton = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const colorButton = screen.getByLabelText('Color: Negro');
      const addButton = screen.getByRole('button', { name: 'AÑADIR' });

      fireEvent.click(storageButton);
      fireEvent.click(colorButton);

      fireEvent.click(addButton);
      expect(mockAddItem).toHaveBeenCalledTimes(1);

      fireEvent.click(addButton);
      expect(mockAddItem).toHaveBeenCalledTimes(2);
    });

    it('should maintain state across selections', () => {
      render(<PhoneInfo phone={mockPhone} onColorChange={mockOnColorChange} />);

      const storage128 = screen.getByRole('button', {
        name: /128 GB storage option/i,
      });
      const negroButton = screen.getByLabelText('Color: Negro');
      const storage256 = screen.getByRole('button', {
        name: /256 GB storage option/i,
      });

      fireEvent.click(storage128);
      fireEvent.click(negroButton);

      expect(storage128).toHaveAttribute('aria-pressed', 'true');
      expect(negroButton).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(storage256);

      expect(storage128).toHaveAttribute('aria-pressed', 'false');
      expect(storage256).toHaveAttribute('aria-pressed', 'true');
      expect(negroButton).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
