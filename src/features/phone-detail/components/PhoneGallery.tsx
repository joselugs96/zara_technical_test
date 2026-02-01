import { useState, useEffect } from 'react';
import styles from './PhoneGallery.module.scss';
import Image from 'next/image';
import { PhoneGalleryProps } from '@/features/phone-detail/lib/types';

function PhoneGallery({ imageUrl, brand, name }: PhoneGalleryProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [imageUrl]);

  const isRedmi =
    brand.toLowerCase().includes('xiaomi') ||
    name.toLowerCase().includes('redmi');

  const isIPhone =
    brand.toLowerCase().includes('apple') ||
    name.toLowerCase().includes('iphone');

  const imageClassName = isRedmi
    ? styles.phoneImageRedmi
    : isIPhone
      ? styles.phoneImageIPhone
      : styles.phoneImageDefault;

  return (
    <figure
      className={styles.gallery}
      aria-label={`${brand} ${name} product image`}
    >
      <Image
        className={`${imageClassName} ${loaded ? styles.imgLoaded : styles.img}`}
        src={imageUrl}
        alt={`${brand} ${name} - Product view`}
        width={700}
        height={700}
        quality={90}
        sizes="(max-width: 768px) 300px, (max-width: 1200px) 500px, 600px"
        priority
        onLoad={() => setLoaded(true)}
      />
    </figure>
  );
}

export default PhoneGallery;