import { NextResponse } from 'next/server';
import {
  validateEnvVars,
  fetchFromUpstream,
  buildUpstreamUrl,
} from '@/app/api/lib/upstreamFetch';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const baseUrl = process.env.PHONES_API_BASE_URL;
  const apiKey = process.env.PHONES_API_KEY;
  const { id } = params;

  if (!id || typeof id !== 'string' || id.trim() === '') {
    return NextResponse.json(
      { ok: false, message: 'Invalid phone ID provided' },
      { status: 400 }
    );
  }

  const envError = validateEnvVars(baseUrl, apiKey);
  if (envError) {
    return NextResponse.json(
      { ok: false, message: envError.error },
      { status: envError.status }
    );
  }

  try {
    const upstreamUrl = buildUpstreamUrl(
      baseUrl!,
      `/products/${encodeURIComponent(id)}`
    );

    const { body } = await fetchFromUpstream({
      url: upstreamUrl,
      apiKey: apiKey!,
      endpoint: 'PhoneDetail',
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
