import { NextResponse } from 'next/server';
import {
  validateEnvVars,
  fetchFromUpstream,
  buildUpstreamUrl,
} from '@/app/api/lib/upstreamFetch';

export async function GET(request: Request) {
  const baseUrl = process.env.PHONES_API_BASE_URL;
  const apiKey = process.env.PHONES_API_KEY;

  const envError = validateEnvVars(baseUrl, apiKey);
  if (envError) {
    return NextResponse.json(
      { ok: false, message: envError.error },
      { status: envError.status }
    );
  }

  const { searchParams } = new URL(request.url);
  const upstreamUrl = new URL(buildUpstreamUrl(baseUrl!, '/products'));

  searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.set(key, value);
  });

  try {
    const { body } = await fetchFromUpstream({
      url: upstreamUrl.toString(),
      apiKey: apiKey!,
      endpoint: 'Phones',
    });

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
  }
}
