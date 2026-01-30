'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PhoneGridSearchProps } from '@/features/phones/lib/types';
import styles from './PhoneGridSearch.module.scss';

function PhoneGridSearch({ phoneCount }: PhoneGridSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const initialValue = searchParams.get('search') ?? '';

  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [displayCount, setDisplayCount] = useState(phoneCount);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }

      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, router, searchParams]);

  useEffect(() => {
    const updateTimer = setTimeout(() => {
      setDisplayCount(phoneCount);
    }, 300);

    return () => clearTimeout(updateTimer);
  }, [phoneCount]);

  return (
    <div className={styles.searchSection}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a smartphone..."
        className={styles.searchInput}
        disabled={isPending}
      />
      <p className={styles.resultCount}>{displayCount} RESULTS</p>
    </div>
  );
}

export default PhoneGridSearch;
