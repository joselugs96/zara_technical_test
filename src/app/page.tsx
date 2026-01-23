import Link from 'next/link';
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
        <h1 style={{ marginBottom: 32, fontSize: 32, fontWeight: 'bold' }}>
          Phones
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 24,
          }}
        >
          {phones.map((phone) => (
            <Link
              key={phone.id}
              href={`/phone/${phone.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                key={phone.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={phone.imageUrl}
                  alt={phone.name}
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    backgroundColor: '#f5f5f5',
                  }}
                />

                <div style={{ padding: 16 }}>
                  <p
                    style={{
                      color: '#999',
                      fontSize: 12,
                      margin: '0 0 8px 0',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {phone.brand}
                  </p>

                  <h3
                    style={{
                      margin: '0 0 12px 0',
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#333',
                    }}
                  >
                    {phone.name}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 12,
                      borderTop: '1px solid #f0f0f0',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#00a4a6',
                        margin: 0,
                      }}
                    >
                      ${phone.basePrice.toFixed(2)}
                    </p>

                    <p
                      style={{
                        fontSize: 12,
                        color: '#666',
                        margin: 0,
                        backgroundColor: '#f5f5f5',
                        padding: '4px 8px',
                        borderRadius: 4,
                      }}
                    >
                      ID: {phone.id}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p style={{ color: '#666', marginTop: 24, textAlign: 'center' }}>
          Total: {phones.length}
        </p>
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
