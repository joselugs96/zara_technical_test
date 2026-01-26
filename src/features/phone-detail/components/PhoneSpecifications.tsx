import styles from './PhoneSpecifications.module.scss';
import { PhoneDetail } from '@/features/phone-detail/lib/types';

interface PhoneSpecificationsProps {
  phone: PhoneDetail;
}

export default function PhoneSpecifications({
  phone,
}: PhoneSpecificationsProps) {
  const specs = [
    { label: 'BRAND', value: phone.brand },
    { label: 'NAME', value: phone.name },
    { label: 'DESCRIPTION', value: phone.description },
    { label: 'SCREEN', value: phone.specs?.screen },
    { label: 'RESOLUTION', value: phone.specs?.resolution },
    { label: 'PROCESSOR', value: phone.specs?.processor },
    { label: 'MAIN CAMERA', value: phone.specs?.mainCamera },
    { label: 'SELFIE CAMERA', value: phone.specs?.selfieCamera },
    { label: 'BATTERY', value: phone.specs?.battery },
    { label: 'OS', value: phone.specs?.os },
    { label: 'SCREEN REFRESH RATE', value: phone.specs?.screenRefreshRate },
  ];

  return (
    <section className={styles.specificationsContainer}>
      <h2 className={styles.title}>SPECIFICATIONS</h2>
      <div className={styles.specsTable}>
        {specs.map(
          (spec, index) =>
            spec.value && (
              <div key={index} className={styles.specRow}>
                <div className={styles.specLabel}>{spec.label}</div>
                <div className={styles.specValue}>{spec.value}</div>
              </div>
            )
        )}
      </div>
    </section>
  );
}
