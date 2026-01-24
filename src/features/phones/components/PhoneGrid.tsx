import { Suspense } from 'react';
import { PhoneGridProps } from '@/features/phones/lib/types';
import PhoneCard from './PhoneCard';
import styles from './PhoneGrid.module.scss';

function PhoneGridContent({ phones }: PhoneGridProps) {
  return (
    <>
      <div className={styles.phoneGrid}>
        {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </>
  );
}

function PhoneGrid({ phones }: PhoneGridProps) {
  return (
    <section
      aria-label="Catálogo de teléfonos"
      className={styles.phoneGridContainer}
    >
      <Suspense fallback={<div />}>
        <PhoneGridContent phones={phones} />
      </Suspense>
    </section>
  );
}

export default PhoneGrid;
