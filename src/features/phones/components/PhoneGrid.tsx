'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { PhoneGridProps } from '@/features/phones/lib/types';
import PhoneCard from './PhoneCard';
import styles from './PhoneGrid.module.scss';

function PhoneGridContent({ phones }: PhoneGridProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [displayPhones, setDisplayPhones] = useState(phones);
  const isFirstRender = useRef(true);
  const previousLength = useRef(phones.length);
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousLength.current = phones.length;
      return;
    }

    if (phones.length === previousLength.current) {
      return;
    }

    setIsVisible(false);

    const hideTimer = setTimeout(() => {
      setDisplayPhones(phones);
      setIsVisible(true);

      if (gridRef.current) {
        gridRef.current.setAttribute('aria-busy', 'false');
      }
    }, 300);

    previousLength.current = phones.length;

    return () => clearTimeout(hideTimer);
  }, [phones]);

  if (displayPhones.length === 0) {
    return null;
  }

  return (
    <ul
      ref={gridRef}
      className={`${styles.phoneGrid} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
      role="list"
      aria-busy={!isVisible}
      aria-label="List of available phones"
    >
      {displayPhones.map((phone) => (
        <li key={phone.id} role="listitem">
          <PhoneCard phone={phone} />
        </li>
      ))}
    </ul>
  );
}

function PhoneGrid({ phones }: PhoneGridProps) {
  return (
    <section aria-label="Phone catalog" className={styles.phoneGridContainer}>
      <Suspense
        fallback={
          <div aria-busy="true" aria-label="Loading phones..." role="status">
            <p className="sr-only">Loading available phones...</p>
          </div>
        }
      >
        <PhoneGridContent phones={phones} />
      </Suspense>
    </section>
  );
}

export default PhoneGrid;
