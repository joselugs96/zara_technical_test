import { headers } from 'next/headers';
import { getPhoneDetail } from '@/features/phone-detail/services/phoneDetail.service';
import PhoneDetailContent from '@/features/phone-detail/components/PhoneDetailContent';

type PhoneDetailPageProps = {
  params: {
    id: string;
  };
};

function getBaseUrlFromHeaders() {
  const h = headers();
  const host = h.get('host');

  if (!host) {
    throw new Error('Host header not found');
  }

  const defaultProto = host?.includes('localhost') ? 'http' : 'https';
  const proto = h.get('x-forwarded-proto') ?? defaultProto;

  return `${proto}://${host}`;
}

export default async function PhoneDetailPage({
  params,
}: PhoneDetailPageProps) {
  const baseUrl = getBaseUrlFromHeaders();
  const phone = await getPhoneDetail(baseUrl, params.id);

  return (
    <main className="container">
      <PhoneDetailContent phone={phone} />
    </main>
  );
}
