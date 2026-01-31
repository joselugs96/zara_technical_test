import { PhoneListItem, GetPhonesParams } from '../lib/types';
import { fetchPhonesFromUpstream } from './phones.repository';

function getClientBaseUrl(): string {
  if (typeof window === 'undefined') {
    throw new Error('getClientBaseUrl called on server');
  }
  return window.location.origin;
}

export async function getPhones(
  params: GetPhonesParams = {}
): Promise<PhoneListItem[]> {
  if (typeof window === 'undefined') {
    return fetchPhonesFromUpstream(params ?? {});
  }

  const baseUrl = getClientBaseUrl();
  const url = new URL('/api/phones', baseUrl);

  if (params?.search) url.searchParams.set('search', params.search);
  if (params?.limit) url.searchParams.set('limit', String(params.limit));
  if (params?.offset) url.searchParams.set('offset', String(params.offset));

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch phones (${res.status})`);
  }

  return res.json();
}
