import { NextResponse } from 'next/server';
import { fetchPhoneDetailFromUpstream } from '@/features/phone-detail/services/phoneDetail.repository';
import { UpstreamError } from '@/app/api/lib/upstreamFetch';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const phone = await fetchPhoneDetailFromUpstream(params.id);
    return NextResponse.json(phone, { status: 200 });
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
