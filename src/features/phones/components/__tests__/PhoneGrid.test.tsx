import { render, screen, act } from '@testing-library/react';
import PhoneGrid from '@/features/phones/components/PhoneGrid';
import { PhoneListItem } from '@/features/phones/lib/types';

// 🔹 Mock de PhoneCard
jest.mock('@/features/phones/components/PhoneCard', () => {
  return function MockPhoneCard({ phone }: { phone: PhoneListItem }) {
    return <div data-testid="phone-card">{phone.name}</div>;
  };
});

describe('PhoneGrid', () => {
  const phones: PhoneListItem[] = [
    {
      id: '1',
      name: 'iPhone 15',
      brand: 'Apple',
      basePrice: 1200,
      imageUrl: 'img',
    },
    {
      id: '2',
      name: 'Pixel 8',
      brand: 'Google',
      basePrice: 900,
      imageUrl: 'img',
    },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders phone catalog section', () => {
    render(<PhoneGrid phones={phones} />);

    expect(
      screen.getByRole('region', { name: /phone catalog/i })
    ).toBeInTheDocument();
  });

  it('renders a list of phones when phones are provided', () => {
    render(<PhoneGrid phones={phones} />);

    const list = screen.getByRole('list', {
      name: /list of available phones/i,
    });

    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Pixel 8')).toBeInTheDocument();
  });

  it('does not render list when phones array is empty', () => {
    render(<PhoneGrid phones={[]} />);

    expect(
      screen.queryByRole('list', {
        name: /list of available phones/i,
      })
    ).not.toBeInTheDocument();
  });

  it('updates the list when phones length changes', async () => {
    const { rerender } = render(<PhoneGrid phones={phones} />);

    const updatedPhones = [
      ...phones,
      {
        id: '3',
        name: 'Galaxy S24',
        brand: 'Samsung',
        basePrice: 1100,
        imageUrl: 'img',
      },
    ];

    // 🔄 Cambiamos props
    rerender(<PhoneGrid phones={updatedPhones} />);

    // ⏳ Avanzamos el timeout de animación
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
  });

  it('sets aria-busy during update and clears it after animation', async () => {
    const { rerender } = render(<PhoneGrid phones={phones} />);

    const updatedPhones = phones.slice(0, 1);

    rerender(<PhoneGrid phones={updatedPhones} />);

    const list = screen.getByRole('list', {
      name: /list of available phones/i,
    });

    // Durante transición
    expect(list).toHaveAttribute('aria-busy', 'true');

    // Después del timeout
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(list).toHaveAttribute('aria-busy', 'false');
  });
});
