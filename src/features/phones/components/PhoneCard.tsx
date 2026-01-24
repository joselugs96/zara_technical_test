import Link from 'next/link';
import { PhoneCardProps } from '@/features/phones/lib/types';

function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <Link
      href={`/phone/${phone.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <article
        style={{
          border: '1px solid #e8e8e8',
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'all 0.2s',
          cursor: 'pointer',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={phone.imageUrl}
            alt={`${phone.name} - ${phone.brand}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              padding: 16,
            }}
          />
        </div>

        <div style={{ padding: '16px 12px' }}>
          <p
            style={{
              color: '#666',
              fontSize: 11,
              margin: '0 0 4px 0',
              textTransform: 'uppercase',
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            {phone.brand}
          </p>

          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: 13,
              fontWeight: 600,
              color: '#333',
              lineHeight: 1.3,
            }}
          >
            {phone.name}
          </h3>

          <p
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#000',
              margin: 0,
            }}
          >
            ${phone.basePrice.toFixed(2)}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default PhoneCard;
