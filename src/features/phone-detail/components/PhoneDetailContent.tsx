'use client';

import { Suspense, useState } from 'react';
import PhoneGallery from './PhoneGallery';
import PhoneInfo from './PhoneInfo';
import PhoneSpecifications from './PhoneSpecifications';
import SimilarProducts from './SimilarProducts';
import { PhoneDetail } from '@/features/phone-detail/lib/types';
import styles from './PhoneDetailContent.module.scss';

interface PhoneDetailContentProps {
  phone: PhoneDetail;
}

function PhoneDetailContent({ phone }: PhoneDetailContentProps) {
  const [selectedColorName, setSelectedColorName] = useState<string>(
    phone.colorOptions?.[0]?.name || ''
  );

  const selectedColorImage =
    phone.colorOptions?.find((color) => color.name === selectedColorName)
      ?.imageUrl ||
    phone.colorOptions?.[0]?.imageUrl ||
    '';

  return (
    <Suspense fallback={<div />}>
      <div className={styles.containerDetail}>
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
    </Suspense>
  );
}

export default PhoneDetailContent;
