import { render, screen } from '@testing-library/react';
import PhoneSpecifications from '@/features/phone-detail/components/PhoneSpecifications';
import { PhoneDetail } from '@/features/phone-detail/lib/types';

describe('PhoneSpecifications', () => {
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
        imageUrl: 'http://example.com/negro.webp',
      },
      {
        name: 'Azul',
        hexCode: '#0000FF',
        imageUrl: 'http://example.com/azul.webp',
      },
    ],
    storageOptions: [
      { capacity: '128 GB', price: 219 },
      { capacity: '256 GB', price: 239 },
    ],
    similarProducts: [],
  };

  it('should render specifications section', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    const section = screen.getByRole('region', {
      name: 'Detailed phone specifications',
    });
    expect(section).toBeInTheDocument();
  });

  it('should have accessible aria-label on section', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    const section = screen.getByLabelText('Phone specifications');
    expect(section).toBeInTheDocument();
  });

  it('should render SPECIFICATIONS title', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByText('SPECIFICATIONS')).toBeInTheDocument();
  });

  it('should render BRAND specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('BRAND')).toBeInTheDocument();
    expect(screen.getByText('Samsung')).toBeInTheDocument();
  });

  it('should render NAME specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('NAME')).toBeInTheDocument();
    expect(screen.getByText('Galaxy A25 5G')).toBeInTheDocument();
  });

  it('should render DESCRIPTION specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('DESCRIPTION')).toBeInTheDocument();
    expect(
      screen.getByText(
        /El Samsung Galaxy A25 5G es un smartphone de gama media/
      )
    ).toBeInTheDocument();
  });

  it('should render SCREEN specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('SCREEN')).toBeInTheDocument();
    expect(screen.getByText('6.5" FHD+')).toBeInTheDocument();
  });

  it('should render RESOLUTION specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('RESOLUTION')).toBeInTheDocument();
    expect(screen.getByText('1080 x 2340 pixels')).toBeInTheDocument();
  });

  it('should render PROCESSOR specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('PROCESSOR')).toBeInTheDocument();
    expect(
      screen.getByText('Samsung Exynos 1280 Octa-Core')
    ).toBeInTheDocument();
  });

  it('should render MAIN CAMERA specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('MAIN CAMERA')).toBeInTheDocument();
    expect(
      screen.getByText(
        /50 MP \(F1.8\) Principal, OIS \+ 8 MP \(F2.2\) Ultra gran angular/
      )
    ).toBeInTheDocument();
  });

  it('should render SELFIE CAMERA specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('SELFIE CAMERA')).toBeInTheDocument();
    expect(screen.getByText('13 MP')).toBeInTheDocument();
  });

  it('should render BATTERY specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('BATTERY')).toBeInTheDocument();
    expect(screen.getByText('5000 mAh')).toBeInTheDocument();
  });

  it('should render OS specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('OS')).toBeInTheDocument();
    expect(screen.getByText('Android 14')).toBeInTheDocument();
  });

  it('should render SCREEN REFRESH RATE specification', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    expect(screen.getByLabelText('SCREEN REFRESH RATE')).toBeInTheDocument();
    expect(screen.getByText('120 Hz')).toBeInTheDocument();
  });

  it('should render all specifications in order', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    const labels = [
      'BRAND',
      'NAME',
      'DESCRIPTION',
      'SCREEN',
      'RESOLUTION',
      'PROCESSOR',
      'MAIN CAMERA',
      'SELFIE CAMERA',
      'BATTERY',
      'OS',
      'SCREEN REFRESH RATE',
    ];

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it('should not render specification row if value is undefined', () => {
    const phoneWithoutBattery: PhoneDetail = {
      ...mockPhone,
      specs: {
        ...mockPhone.specs,
        battery: '',
      },
    };

    render(<PhoneSpecifications phone={phoneWithoutBattery} />);

    const batteryLabel = screen.queryByLabelText('BATTERY');
    expect(batteryLabel).not.toBeInTheDocument();
  });

  it('should not render specification row if value is null', () => {
    const phoneWithoutOS: PhoneDetail = {
      ...mockPhone,
      specs: {
        ...mockPhone.specs,
        os: '',
      },
    };

    render(<PhoneSpecifications phone={phoneWithoutOS} />);

    const osLabel = screen.queryByLabelText('OS');
    expect(osLabel).not.toBeInTheDocument();
  });

  it('should render only available specs when some are missing', () => {
    const phonePartialSpecs: PhoneDetail = {
      ...mockPhone,
      specs: {
        screen: '6.5" FHD+',
        resolution: '',
        processor: 'Samsung Exynos 1280 Octa-Core',
        mainCamera: '',
        selfieCamera: '',
        battery: '5000 mAh',
        os: '',
        screenRefreshRate: '',
      },
    };

    render(<PhoneSpecifications phone={phonePartialSpecs} />);

    expect(screen.getByLabelText('SCREEN')).toBeInTheDocument();
    expect(screen.getByLabelText('PROCESSOR')).toBeInTheDocument();
    expect(screen.getByLabelText('BATTERY')).toBeInTheDocument();

    expect(screen.queryByLabelText('RESOLUTION')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('MAIN CAMERA')).not.toBeInTheDocument();
  });

  it('should have proper structure with spec rows', () => {
    const { container } = render(<PhoneSpecifications phone={mockPhone} />);

    const specRows = container.querySelectorAll('.specRow');
    expect(specRows.length).toBeGreaterThan(0);
    expect(specRows.length).toBe(11); // All specs available
  });

  it('should have spec label and spec value divs in each row', () => {
    const { container } = render(<PhoneSpecifications phone={mockPhone} />);

    const specRows = container.querySelectorAll('.specRow');
    specRows.forEach((row) => {
      const label = row.querySelector('.specLabel');
      const value = row.querySelector('.specValue');
      expect(label).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });
  });

  it('should have correct CSS classes applied', () => {
    const { container } = render(<PhoneSpecifications phone={mockPhone} />);

    const section = container.querySelector('.specificationsContainer');
    const title = container.querySelector('.title');
    const table = container.querySelector('.specsTable');

    expect(section).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });

  it('should render description with long text without truncation', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    const description = screen.getByText(
      /El Samsung Galaxy A25 5G es un smartphone de gama media con una pantalla FHD\+ de 6.5 pulgadas, procesador Exynos 1280 Octa-Core, y una potente batería de 5000mAh, ofreciendo un rendimiento equilibrado y una experiencia 5G asequible./
    );
    expect(description).toBeInTheDocument();
  });

  it('should render camera specs with special characters', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    const mainCamera = screen.getByText(
      /50 MP \(F1.8\) Principal, OIS \+ 8 MP \(F2.2\) Ultra gran angular \+ 2 MP \(F2.4\) Macro/
    );
    expect(mainCamera).toBeInTheDocument();
  });

  it('should handle phone with only brand and name', () => {
    const minimalPhone: PhoneDetail = {
      ...mockPhone,
      specs: {
        screen: '',
        resolution: '',
        processor: '',
        mainCamera: '',
        selfieCamera: '',
        battery: '',
        os: '',
        screenRefreshRate: '',
      },
    };

    render(<PhoneSpecifications phone={minimalPhone} />);

    expect(screen.getByLabelText('BRAND')).toBeInTheDocument();
    expect(screen.getByLabelText('NAME')).toBeInTheDocument();
    expect(screen.getByLabelText('DESCRIPTION')).toBeInTheDocument();

    expect(screen.queryByLabelText('SCREEN')).not.toBeInTheDocument();
  });

  it('should be semantically correct with section and region roles', () => {
    render(<PhoneSpecifications phone={mockPhone} />);

    const section = screen.getByLabelText('Phone specifications');
    expect(section.tagName).toBe('SECTION');

    const region = screen.getByRole('region', {
      name: 'Detailed phone specifications',
    });
    expect(region).toBeInTheDocument();
  });

  it('should render title as h2 element', () => {
    const { container } = render(<PhoneSpecifications phone={mockPhone} />);

    const title = container.querySelector('h2');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('SPECIFICATIONS');
  });
});
