import { fetchPhoneDetailFromUpstream } from '@/features/phone-detail/services/phoneDetail.repository';
import {
  fetchFromUpstream,
  buildUpstreamUrl,
  validateEnvVars,
} from '@/app/api/lib/upstreamFetch';

jest.mock('@/app/api/lib/upstreamFetch', () => ({
  fetchFromUpstream: jest.fn(),
  buildUpstreamUrl: jest.fn(),
  validateEnvVars: jest.fn(),
}));

describe('fetchPhoneDetailFromUpstream', () => {
  const BASE_URL = 'https://api.example.com';
  const API_KEY = 'test-api-key';
  const PHONE_ID = 'iphone-123';

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.PHONES_API_BASE_URL = BASE_URL;
    process.env.PHONES_API_KEY = API_KEY;

    (validateEnvVars as jest.Mock).mockReturnValue(null);
    (buildUpstreamUrl as jest.Mock).mockImplementation(
      (base, path) => `${base}${path}`
    );
  });

  it('fetches phone detail successfully', async () => {
    const phoneDetail = {
      id: PHONE_ID,
      name: 'iPhone',
    };

    (fetchFromUpstream as jest.Mock).mockResolvedValue({
      body: phoneDetail,
    });

    const result = await fetchPhoneDetailFromUpstream(PHONE_ID);

    expect(buildUpstreamUrl).toHaveBeenCalledWith(
      BASE_URL,
      `/products/${encodeURIComponent(PHONE_ID)}`
    );

    expect(fetchFromUpstream).toHaveBeenCalledWith({
      url: `${BASE_URL}/products/${encodeURIComponent(PHONE_ID)}`,
      apiKey: API_KEY,
      endpoint: 'PhoneDetail',
    });

    expect(result).toEqual(phoneDetail);
  });

  it('throws error when phone id is empty', async () => {
    await expect(fetchPhoneDetailFromUpstream('')).rejects.toThrow(
      'Invalid phone ID'
    );

    expect(fetchFromUpstream).not.toHaveBeenCalled();
  });
});
