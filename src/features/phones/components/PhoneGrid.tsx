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
    }, 300);

    previousLength.current = phones.length;

    return () => clearTimeout(hideTimer);
  }, [phones]);

  if (displayPhones.length === 0) {
    return null;
  }

  return (
    <div
      className={`${styles.phoneGrid} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
    >
      {displayPhones.map((phone) => (
        <PhoneCard key={phone.id} phone={phone} />
      ))}
    </div>
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
