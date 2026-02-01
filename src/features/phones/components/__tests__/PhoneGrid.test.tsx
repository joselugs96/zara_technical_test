import { render, screen, act } from '@testing-library/react';
import PhoneGrid from '@/features/phones/components/PhoneGrid';
import { PhoneListItem } from '@/features/phones/lib/types';
import { LoadingProvider } from '@/shared/context/LoadingContext';

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
    render(
      <LoadingProvider>
        <PhoneGrid phones={phones} />
      </LoadingProvider>
    );

    expect(
      screen.getByRole('region', { name: /phone catalog/i })
    ).toBeInTheDocument();
  });

  it('renders a list of phones when phones are provided', () => {
    render(
      <LoadingProvider>
        <PhoneGrid phones={phones} />
      </LoadingProvider>
    );

    const list = screen.getByRole('list', {
      name: /list of available phones/i,
    });

    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Pixel 8')).toBeInTheDocument();
  });

  it('does not render list when phones array is empty', () => {
    render(
      <LoadingProvider>
        <PhoneGrid phones={[]} />
      </LoadingProvider>
    );

    expect(
      screen.queryByRole('list', {
        name: /list of available phones/i,
      })
    ).not.toBeInTheDocument();
  });

  it('updates the list when phones length changes', async () => {
    const { rerender } = render(
      <LoadingProvider>
        <PhoneGrid phones={phones} />
      </LoadingProvider>
    );

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

    rerender(
      <LoadingProvider>
        <PhoneGrid phones={updatedPhones} />
      </LoadingProvider>
    );

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
  });
});
