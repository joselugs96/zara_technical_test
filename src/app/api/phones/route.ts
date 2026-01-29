import { NextResponse } from 'next/server';
import { fetchPhonesFromUpstream } from '@/features/phones/services/phones.repository';
import { UpstreamError } from '@/app/api/lib/upstreamFetch';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const phones = await fetchPhonesFromUpstream({
      search: searchParams.get('search') ?? undefined,
      limit: Number(searchParams.get('limit') ?? 20),
      offset: Number(searchParams.get('offset') ?? 0),
    });

    return NextResponse.json(phones, { status: 200 });
  } catch (err) {
    if (err instanceof UpstreamError) {
      return NextResponse.json(
        { ok: false, message: err.message },
        { status: err.status }
      );
    }

    return NextResponse.json(
      { ok: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
