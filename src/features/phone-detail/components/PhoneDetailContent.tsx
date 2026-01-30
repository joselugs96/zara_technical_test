'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import PhoneGallery from './PhoneGallery';
import PhoneInfo from './PhoneInfo';
import PhoneSpecifications from './PhoneSpecifications';
import SimilarProducts from './SimilarProducts';
import { PhoneDataProps } from '@/features/phone-detail/lib/types';
import styles from './PhoneDetailContent.module.scss';
import { ROUTES } from '@/shared/lib/routes';

function PhoneDetailContent({ phone }: PhoneDataProps) {
  const [selectedColorName, setSelectedColorName] = useState<string>(
    phone.colorOptions?.[0]?.name || ''
  );

  const selectedColorImage =
    phone.colorOptions?.find((color) => color.name === selectedColorName)
      ?.imageUrl ||
    phone.colorOptions?.[0]?.imageUrl ||
    '';

  return (
    <Suspense
      fallback={
        <div
          aria-busy="true"
          aria-label="Loading phone details..."
          role="status"
        >
          <p className="sr-only">Loading product information...</p>
        </div>
      }
    >
      <div className={styles.containerDetail}>
        <Link
          href={ROUTES.home}
          className={styles.backButton}
          aria-label="Go back to products list"
        >
          <svg
            className={styles.backIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          BACK
        </Link>
        <div className={styles.phoneDetailContainer}>
          <div className={styles.gridPhoneDetail}>
            <PhoneGallery
              imageUrl={selectedColorImage}
              brand={phone.brand}
              name={phone.name}
            />
            <PhoneInfo phone={phone} onColorChange={setSelectedColorName} />
          </div>

          <PhoneSpecifications phone={phone} />

          <SimilarProducts products={phone.similarProducts} />
        </div>
      </div>
    </Suspense>
  );
}

export default PhoneDetailContent;
