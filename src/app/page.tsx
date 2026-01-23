import { headers } from 'next/headers';
import { getPhones } from '@/features/phones/services/phones.service';

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

async function HomePage() {
  try {
    const baseUrl = getBaseUrlFromHeaders();
    const phones = await getPhones(baseUrl, { limit: 20 });

    return (
      <main style={{ padding: 24 }}>
        <h1>Phones</h1>
        <p>Results: {JSON.stringify(phones)}</p>
      </main>
    );
  } catch (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Error</h1>
        <p>
          {error instanceof Error ? error.message : 'Error al cargar teléfonos'}
        </p>
      </main>
    );
  }
}
export default HomePage;
