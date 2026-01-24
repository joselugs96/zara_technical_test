import { PhoneGridProps } from '@/features/phones/lib/types';
import PhoneCard from './PhoneCard';

function PhoneGrid({ phones }: PhoneGridProps) {
  return (
    <section aria-label="Catálogo de teléfonos">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>

      <p
        style={{
          color: '#999',
          marginTop: 32,
          textAlign: 'center',
          fontSize: 13,
        }}
      >
        Total: {phones.length} teléfonos disponibles
      </p>
    </section>
  );
}

export default PhoneGrid;
