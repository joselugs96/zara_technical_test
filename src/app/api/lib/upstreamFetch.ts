const DEFAULT_TIMEOUT_MS = 10_000;

import { UpstreamFetchOptions, UpstreamResponse } from './types';

export function validateEnvVars(
  baseUrl: string | undefined,
  apiKey: string | undefined
) {
  if (!baseUrl) {
    return { error: 'Missing PHONES_API_BASE_URL env var', status: 500 };
  }

  if (!apiKey) {
    return { error: 'Missing PHONES_API_KEY env var', status: 500 };
  }

  return null;
}

export async function fetchFromUpstream(
  options: UpstreamFetchOptions
): Promise<UpstreamResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(options.url, {
      method: 'GET',
      headers: {
        'x-api-key': options.apiKey,
        Accept: 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    const contentType = res.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');

    const body = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      throw {
        message: 'Upstream request failed',
        status: res.status,
        body,
      };
    }

    return { body, isJson };
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';

    console.error(`${options.endpoint} API error:`, {
      isAbort,
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    throw {
      message: isAbort
        ? 'Upstream request timed out'
        : 'Upstream request error',
      status: isAbort ? 504 : 502,
      isAbort,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export function buildUpstreamUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, '')}${path}`;
}
