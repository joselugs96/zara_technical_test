import { PhoneListItem, GetPhonesParams } from '../lib/types';

export async function getPhones(
  baseUrl: string,
  { search, limit = 20, offset = 0 }: GetPhonesParams = {}
): Promise<PhoneListItem[]> {
  const url = new URL('/api/phones', baseUrl);

  if (search) url.searchParams.set('search', search);
  if (limit) url.searchParams.set('limit', String(limit));
  if (offset) url.searchParams.set('offset', String(offset));

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch phones (${res.status})`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid response structure');
    }

    return data as PhoneListItem[];
  } catch (error) {
    console.error('Error fetching phones:', error);
    throw error;
  }
}
