import { PhoneDetail } from '../lib/types';

export async function getPhoneDetail(
  baseUrl: string,
  id: string
): Promise<PhoneDetail> {
  const url = new URL(`/api/phones/${id}`, baseUrl);

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch phone detail (${res.status})`);
    }

    const data = await res.json();

    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid response structure: expected object');
    }

    return data as PhoneDetail;
  } catch (error) {
    console.error('Error fetching phone detail:', error);
    throw error;
  }
}
