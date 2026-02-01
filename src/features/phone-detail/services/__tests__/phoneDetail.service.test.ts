import { getPhoneDetail } from '@/features/phone-detail/services/phoneDetail.service';

jest.mock('@/features/phone-detail/services/phoneDetail.repository', () => {
  const originalModule = jest.requireActual(
    '@/features/phone-detail/services/phoneDetail.repository'
  );
  return {
    ...originalModule,
    fetchPhoneDetailFromUpstream: jest.fn(),
  };
});
describe('getPhoneDetail (client-side)', () => {
  const PHONE_ID = '123';

  beforeEach(() => {
    jest.clearAllMocks();

    (global as unknown as Record<string, unknown>).window = {
      location: { origin: 'http://localhost' },
    };

    global.fetch = jest.fn();
  });

  afterEach(() => {
    delete (global as unknown as Record<string, unknown>).window;
  });

  it('fetches phone detail from API and returns data', async () => {
    const mockPhone = {
      id: PHONE_ID,
      name: 'iPhone',
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPhone),
    });

    const result = await getPhoneDetail(PHONE_ID);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost/api/phones/123',
      { cache: 'no-store' }
    );

    expect(result).toEqual(mockPhone);
  });

  it('throws an error when fetch response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(getPhoneDetail(PHONE_ID)).rejects.toThrow(
      'Failed to fetch phone detail (404)'
    );
  });

  it('throws an error when response is not a valid object', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue('invalid'),
    });

    await expect(getPhoneDetail(PHONE_ID)).rejects.toThrow(
      'Invalid response structure'
    );
  });

  it('throws an error when response is null', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(null),
    });

    await expect(getPhoneDetail(PHONE_ID)).rejects.toThrow(
      'Invalid response structure'
    );
  });
});
