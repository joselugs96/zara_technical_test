import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import PhoneGridSearch from '@/features/phones/components/PhoneGridSearch';
import { LoadingProvider } from '@/shared/context/LoadingContext';

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

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, (callback: () => void) => callback()],
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

  it('removes search param when input is cleared', async () => {
    render(
      <LoadingProvider>
        <PhoneGridSearch phoneCount={10} />
      </LoadingProvider>
    );

    const input = screen.getByRole('searchbox') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?');
    });
  });

  it('renders result count and updates it when phoneCount changes', async () => {
    const { rerender } = render(
      <LoadingProvider>
        <PhoneGridSearch phoneCount={5} />
      </LoadingProvider>
    );

    expect(screen.getByRole('status')).toHaveTextContent('5 RESULTS');

    act(() => {
      rerender(
        <LoadingProvider>
          <PhoneGridSearch phoneCount={12} />
        </LoadingProvider>
      );
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('12 RESULTS');
    });
  });
});
