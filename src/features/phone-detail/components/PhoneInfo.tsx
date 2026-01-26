import { useState } from 'react';
import styles from './PhoneInfo.module.scss';
import { PhoneDetail } from '@/features/phone-detail/lib/types';

interface PhoneInfoProps {
  phone: PhoneDetail;
  onColorChange?: (colorName: string) => void;
}

function PhoneInfo({ phone, onColorChange }: PhoneInfoProps) {
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [fadeKey, setFadeKey] = useState(0);

  const isFullyConfigured = selectedStorage !== '' && selectedColor !== '';

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    onColorChange?.(colorName);
  };

  const handleStorageChange = (capacity: string) => {
    setSelectedStorage(capacity);
    setFadeKey((prev) => prev + 1);
  };

  const currentPrice = selectedStorage
    ? phone.storageOptions?.find(
        (option) => option.capacity === selectedStorage
      )?.price || phone.basePrice
    : phone.storageOptions?.[0]?.price || phone.basePrice;

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.name}>{phone.name}</h1>
      <p className={styles.price}>
        <span key={fadeKey} className={styles.priceFade}>
          {currentPrice}
        </span>
        {' EUR'}
      </p>

      {phone.storageOptions && phone.storageOptions.length > 0 && (
        <div className={styles.sectionCapacity}>
          <h3 className={styles.sectionTitle}>
            Storage ¿How much space do you need?
          </h3>
          <div className={styles.optionsCapacityGrid}>
            {phone.storageOptions.map((option) => (
              <button
                key={option.capacity}
                className={`${styles.optionCapacityButton} ${
                  selectedStorage === option.capacity ? styles.active : ''
                }`}
                onClick={() => handleStorageChange(option.capacity)}
              >
                {option.capacity}
              </button>
            ))}
          </div>
        </div>
      )}

      {phone.colorOptions && phone.colorOptions.length > 0 && (
        <div className={styles.sectionColor}>
          <h3 className={styles.sectionTitle}>Color. Pick your favourite</h3>
          <div className={styles.colorGrid}>
            {phone.colorOptions.map((color) => (
              <button
                key={color.name}
                className={`${styles.colorButton} ${
                  selectedColor === color.name ? styles.active : ''
                }`}
                style={{ backgroundColor: color.hexCode }}
                onClick={() => handleColorChange(color.name)}
                title={color.name}
                aria-label={`Color ${color.name}`}
                aria-pressed={selectedColor === color.name}
              />
            ))}
          </div>
        </div>
      )}

      <button
        className={styles.addToCartButton}
        onClick={() => console.log('CARRITO')}
        disabled={!isFullyConfigured}
      >
        AÑADIR
      </button>
    </div>
  );
}

export default PhoneInfo;
