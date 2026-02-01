import { PhoneListItem, GetPhonesParams } from '../lib/types';

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
   return process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`;
  }
  return window.location.origin;
}

export async function getPhones(
  params: GetPhonesParams = {}
): Promise<PhoneListItem[]> {
  const baseUrl = getApiBaseUrl();
  const url = new URL('/api/phones', baseUrl);

  if (params?.search) url.searchParams.set('search', params.search);
  if (params?.limit) url.searchParams.set('limit', String(params.limit));
  if (params?.offset) url.searchParams.set('offset', String(params.offset));

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch phones (${res.status})`);
  }

  return res.json();
}