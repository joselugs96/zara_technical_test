import { PhoneDetail } from '../lib/types';

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`;
  }
  return window.location.origin;
}

export async function getPhoneDetail(id: string): Promise<PhoneDetail> {
  const baseUrl = getApiBaseUrl();
  const url = new URL(`/api/phones/${id}`, baseUrl);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch phone detail (${res.status})`);
  }

  const data = await res.json();

  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid response structure');
  }

  return data as PhoneDetail;
}