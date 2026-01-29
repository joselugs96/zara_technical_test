import {
  fetchFromUpstream,
  buildUpstreamUrl,
  validateEnvVars,
} from '@/app/api/lib/upstreamFetch';
import { PhoneDetail } from '../lib/types';

export async function fetchPhoneDetailFromUpstream(
  id: string
): Promise<PhoneDetail> {
  if (!id || id.trim() === '') {
    throw new Error('Invalid phone ID');
  }

  const baseUrl = process.env.PHONES_API_BASE_URL;
  const apiKey = process.env.PHONES_API_KEY;

  const envError = validateEnvVars(baseUrl, apiKey);
  if (envError) {
    throw new Error(envError.error);
  }

  const upstreamUrl = buildUpstreamUrl(
    baseUrl!,
    `/products/${encodeURIComponent(id)}`
  );

  const { body } = await fetchFromUpstream({
    url: upstreamUrl,
    apiKey: apiKey!,
    endpoint: 'PhoneDetail',
  });

  if (typeof body !== 'object' || body === null) {
    throw new Error('Invalid upstream response');
  }

  return body as PhoneDetail;
}
