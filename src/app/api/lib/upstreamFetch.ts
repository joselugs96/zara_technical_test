const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 500;

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
  let lastError: UpstreamError | undefined;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
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

      clearTimeout(timeoutId);

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
      clearTimeout(timeoutId);

      const isAbort = err instanceof Error && err.name === 'AbortError';

      lastError =
        err instanceof UpstreamError
          ? err
          : new UpstreamError(
              isAbort ? 'Upstream request timed out' : 'Upstream request error',
              isAbort ? 504 : 502,
              { isAbort }
            );

      if (isAbort && attempt < MAX_RETRIES) {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY_MS * attempt)
        );
        continue;
      }

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY_MS * attempt)
        );
        continue;
      }
    }
  }

  throw lastError || new UpstreamError('Unknown error', 502);
}

export function buildUpstreamUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, '')}${path}`;
}
