import Link from 'next/link';
import { PhoneCardProps } from '@/features/phones/lib/types';
import styles from './PhoneCard.module.scss';
import Image from 'next/image';
import { ROUTES } from '@/shared/lib/routes';

function PhoneCard({ phone }: PhoneCardProps) {
  const isRedmi =
    phone.brand.toLowerCase().includes('xiaomi') ||
    phone.name.toLowerCase().includes('redmi');

  return (
    <Link href={ROUTES.phoneDetail(phone.id)} className={styles.phoneCard}>
      <article className={styles.phoneCardContent}>
        <div className={styles.phoneImage}>
          <Image
            src={phone.imageUrl}
            alt={`${phone.name} - ${phone.brand}`}
            fill
            className={
              isRedmi ? styles.phoneImageRedmi : styles.phoneImageDefault
            }
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <div className={styles.phoneInfo}>
          <p className={styles.phoneBrand}>{phone.brand}</p>

          <div className={styles.phoneNameAndPrice}>
            <h3 className={styles.phoneName}>{phone.name}</h3>
            <p className={styles.phonePrice}>{phone.basePrice} EUR</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PhoneCard;
