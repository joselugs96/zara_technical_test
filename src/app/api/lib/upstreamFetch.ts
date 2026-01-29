const DEFAULT_TIMEOUT_MS = 10_000;

import { UpstreamFetchOptions, UpstreamResponse } from './types';
export class UpstreamError extends Error {
  status: number;
  isAbort: boolean;
  body?: unknown;

  constructor(
    message: string,
    status: number,
    options?: {
      isAbort?: boolean;
      body?: unknown;
    }
  ) {
    super(message);
    this.name = 'UpstreamError';
    this.status = status;
    this.isAbort = options?.isAbort ?? false;
    this.body = options?.body;
  }
}

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
      throw new UpstreamError('Upstream request failed', res.status, {
        body,
      });
    }

    return { body, isJson };
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';

    const error =
      err instanceof UpstreamError
        ? err
        : new UpstreamError(
            isAbort ? 'Upstream request timed out' : 'Upstream request error',
            isAbort ? 504 : 502,
            { isAbort }
          );

    console.error(`${options.endpoint} API error:`, {
      isAbort: error.isAbort,
      status: error.status,
      message: error.message,
      timestamp: new Date().toISOString(),
    });

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function buildUpstreamUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, '')}${path}`;
}
