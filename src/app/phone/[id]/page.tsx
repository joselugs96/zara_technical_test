import { headers } from 'next/headers';
import { getPhoneDetail } from '@/features/phone-detail/services/phoneDetail.service';

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
    <main style={{ padding: 24 }}>
      <h1>{phone.name}</h1>

      <pre
        style={{
          marginTop: 16,
          padding: 12,
          background: '#f6f6f6',
          borderRadius: 8,
          overflowX: 'auto',
        }}
      >
        {JSON.stringify(phone, null, 2)}
      </pre>
    </main>
  );
}
