import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PhoneInfo.module.scss';
import { PhoneDetail } from '@/features/phone-detail/lib/types';
import { useCart } from '@/shared/context/CartContext';
import { ROUTES } from '@/shared/lib/routes';

interface PhoneInfoProps {
  phone: PhoneDetail;
  onColorChange?: (colorName: string) => void;
}

function PhoneInfo({ phone, onColorChange }: PhoneInfoProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const isFullyConfigured = selectedStorage !== '' && selectedColor !== '';

  const currentPrice = selectedStorage
    ? phone.storageOptions?.find(
        (option) => option.capacity === selectedStorage
      )?.price || phone.basePrice
    : phone.storageOptions?.[0]?.price || phone.basePrice;

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    onColorChange?.(colorName);
  };

  const handleStorageChange = (capacity: string) => {
    setSelectedStorage(capacity);
  };

  const handleAddToCart = () => {
    if (isFullyConfigured && selectedStorage && selectedColor) {
      const selectedColorOption = phone.colorOptions?.find(
        (color) => color.name === selectedColor
      );

      addItem({
        id: phone.id,
        name: phone.name,
        price: currentPrice,
        color: selectedColor,
        storage: selectedStorage,
        imageUrl:
          selectedColorOption?.imageUrl || phone.colorOptions?.[0]?.imageUrl,
      });
      router.push(ROUTES.cart);
    }
  };

  return (
    <section className={styles.productInfo}>
      <h2 className={styles.name}>{phone.name}</h2>
      <p className={styles.price}>
        <span className={styles.priceFade}>{currentPrice}</span>
        {' EUR'}
      </p>

      {phone.storageOptions && phone.storageOptions.length > 0 && (
        <div className={styles.sectionCapacity}>
          <h3 id="storage-legend" className={styles.sectionTitle}>
            Storage: How much space do you need?
          </h3>
          <div
            className={styles.optionsCapacityGrid}
            role="group"
            aria-labelledby="storage-legend"
          >
            {phone.storageOptions.map((option) => (
              <button
                key={option.capacity}
                id={`storage-${option.capacity}`}
                className={`${styles.optionCapacityButton} ${
                  selectedStorage === option.capacity ? styles.active : ''
                }`}
                onClick={() => handleStorageChange(option.capacity)}
                aria-pressed={selectedStorage === option.capacity}
                aria-label={`${option.capacity} storage option`}
              >
                {option.capacity}
              </button>
            ))}
          </div>
        </div>
      )}

      {phone.colorOptions && phone.colorOptions.length > 0 && (
        <div className={styles.sectionColor}>
          <h3 id="color-legend" className={styles.sectionTitle}>
            Color: Pick your favourite
          </h3>
          <div
            className={styles.colorGrid}
            role="group"
            aria-labelledby="color-legend"
          >
            {phone.colorOptions.map((color) => (
              <button
                key={color.name}
                id={`color-${color.name}`}
                className={`${styles.colorButton} ${
                  selectedColor === color.name ? styles.active : ''
                }`}
                style={{ backgroundColor: color.hexCode }}
                onClick={() => handleColorChange(color.name)}
                aria-label={`Color: ${color.name}`}
                aria-pressed={selectedColor === color.name}
                title={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
      )}

      <button
        className={styles.addToCartButton}
        onClick={handleAddToCart}
        disabled={!isFullyConfigured}
        aria-disabled={!isFullyConfigured}
      >
        AÑADIR
      </button>
    </section>
  );
}

export default PhoneInfo;
