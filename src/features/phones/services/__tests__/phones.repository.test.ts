import { fetchPhonesFromUpstream } from '@/features/phones/services/phones.repository';
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

describe('fetchPhonesFromUpstream', () => {
  const BASE_URL = 'https://api.example.com';
  const API_KEY = 'test-api-key';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PHONES_API_BASE_URL = BASE_URL;
    process.env.PHONES_API_KEY = API_KEY;

    (validateEnvVars as jest.Mock).mockReturnValue(null);
    (buildUpstreamUrl as jest.Mock).mockReturnValue(`${BASE_URL}/products`);
  });

  it('fetches phones with search, limit and offset', async () => {
    const upstreamResponse = {
      body: [
        { id: 1, name: 'iPhone' },
        { id: 2, name: 'Pixel' },
      ],
    };

    (fetchFromUpstream as jest.Mock).mockResolvedValue(upstreamResponse);

    const result = await fetchPhonesFromUpstream({
      search: 'phone',
      limit: 10,
      offset: 5,
    });

    expect(buildUpstreamUrl).toHaveBeenCalledWith(BASE_URL, '/products');

    expect(fetchFromUpstream).toHaveBeenCalledWith({
      url: expect.stringContaining('search=phone'),
      apiKey: API_KEY,
      endpoint: 'Phones',
    });

    expect(result).toEqual(upstreamResponse.body);
  });

  it('throws an error when upstream response is not an array', async () => {
    (fetchFromUpstream as jest.Mock).mockResolvedValue({
      body: { invalid: true },
    });

    await expect(fetchPhonesFromUpstream({})).rejects.toThrow(
      'Invalid upstream response'
    );
  });

  it('removes duplicated phones by id', async () => {
    (fetchFromUpstream as jest.Mock).mockResolvedValue({
      body: [
        { id: 1, name: 'iPhone' },
        { id: 1, name: 'iPhone duplicated' },
        { id: 2, name: 'Pixel' },
      ],
    });

    const result = await fetchPhonesFromUpstream({});

    expect(result).toEqual([
      { id: 1, name: 'iPhone duplicated' },
      { id: 2, name: 'Pixel' },
    ]);
  });
});
