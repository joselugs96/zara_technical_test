import { render, screen, fireEvent, act } from '@testing-library/react';
import PhoneGridSearch from '@/features/phones/components/PhoneGridSearch';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'search') return 'iphone';
      return null;
    },
    toString: () => 'search=iphone',
  }),
}));

describe('PhoneGridSearch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockPush.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders search input with initial value from URL', () => {
    render(<PhoneGridSearch phoneCount={10} />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('iphone');
  });

  it('updates input value when typing', () => {
    render(<PhoneGridSearch phoneCount={10} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'samsung' } });

    expect(input).toHaveValue('samsung');
  });

  it('updates URL with debounce when search term changes', async () => {
    render(<PhoneGridSearch phoneCount={10} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'pixel' } });

    // ⏳ Esperamos el debounce
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(mockPush).toHaveBeenCalledWith('/?search=pixel');
  });

  it('removes search param when input is cleared', async () => {
    render(<PhoneGridSearch phoneCount={10} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: '' } });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(mockPush).toHaveBeenCalledWith('/?');
  });

  it('renders result count and updates it when phoneCount changes', async () => {
    const { rerender } = render(<PhoneGridSearch phoneCount={5} />);

    expect(screen.getByRole('status')).toHaveTextContent('5 RESULTS');

    rerender(<PhoneGridSearch phoneCount={12} />);

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByRole('status')).toHaveTextContent('12 RESULTS');
  });

  it('has correct accessibility attributes', () => {
    render(<PhoneGridSearch phoneCount={3} />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('aria-describedby', 'search-results');

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });
});
