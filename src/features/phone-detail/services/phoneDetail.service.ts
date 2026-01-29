import { PhoneDetail } from '../lib/types';
import { fetchPhoneDetailFromUpstream } from './phoneDetail.repository';

export async function getPhoneDetail(id: string): Promise<PhoneDetail> {
  if (typeof window === 'undefined') {
    return fetchPhoneDetailFromUpstream(id);
  }

  const url = new URL(`/api/phones/${id}`, window.location.origin);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch phone detail (${res.status})`);
  }

  const data = await res.json();

  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid response structure');
  }

  return data as PhoneDetail;
}
