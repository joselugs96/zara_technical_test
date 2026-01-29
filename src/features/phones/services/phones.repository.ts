import {
  fetchFromUpstream,
  buildUpstreamUrl,
  validateEnvVars,
} from '@/app/api/lib/upstreamFetch';

import { GetPhonesParams, PhoneListItem } from '../lib/types';

export async function fetchPhonesFromUpstream(
  params: GetPhonesParams
): Promise<PhoneListItem[]> {
  const baseUrl = process.env.PHONES_API_BASE_URL;
  const apiKey = process.env.PHONES_API_KEY;

  const envError = validateEnvVars(baseUrl, apiKey);
  if (envError) {
    throw new Error(envError.error);
  }

  const upstreamUrl = new URL(buildUpstreamUrl(baseUrl!, '/products'));

  if (params.search) upstreamUrl.searchParams.set('search', params.search);
  if (params.limit) upstreamUrl.searchParams.set('limit', String(params.limit));
  if (params.offset)
    upstreamUrl.searchParams.set('offset', String(params.offset));

  const { body } = await fetchFromUpstream({
    url: upstreamUrl.toString(),
    apiKey: apiKey!,
    endpoint: 'Phones',
  });

  if (!Array.isArray(body)) {
    throw new Error('Invalid upstream response');
  }

  const phones = body as PhoneListItem[];

  const uniquePhones = Array.from(
    new Map(phones.map((phone) => [phone.id, phone])).values()
  );

  return uniquePhones;
}
