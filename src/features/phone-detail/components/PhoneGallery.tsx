import styles from './PhoneGallery.module.scss';
import Image from 'next/image';
import { PhoneGalleryProps } from '@/features/phone-detail/lib/types';

function PhoneGallery({ imageUrl, brand, name }: PhoneGalleryProps) {
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
    <figure className={styles.gallery}>
      <Image
        className={imageClassName}
        src={imageUrl}
        alt={name}
        width={700}
        height={700}
        quality={90}
        priority={false}
        sizes="(max-width: 768px) 300px, (max-width: 1200px) 500px, 600px"
      />
    </figure>
  );
}
export default PhoneGallery;
