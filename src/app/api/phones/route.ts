import { NextResponse } from 'next/server';

const DEFAULT_TIMEOUT_MS = 10_000;

export async function GET(request: Request) {
  const baseUrl = process.env.PHONES_API_BASE_URL;
  const apiKey = process.env.PHONES_API_KEY;

  if (!baseUrl) {
    return NextResponse.json(
      { ok: false, message: 'Missing PHONES_API_BASE_URL env var' },
      { status: 500 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: 'Missing PHONES_API_KEY env var' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);

  const upstreamUrl = new URL(`${baseUrl.replace(/\/$/, '')}/products`);

  searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.set(key, value);
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        Accept: 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    const contentType = res.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');

    const body = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Upstream request failed',
          status: res.status,
          data: body,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(body, { status: 200 });
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';

    console.error('Phones API error:', {
      isAbort,
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        ok: false,
        message: isAbort
          ? 'Upstream request timed out'
          : 'Upstream request error',
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
