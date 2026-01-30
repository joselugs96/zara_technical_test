'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CartItem as CartItemType } from '@/shared/lib/types';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
}

function CartItem({ item, onRemove }: CartItemProps) {
  const isRedmi = item.name.toLowerCase().includes('redmi');
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  return (
    <article
      className={`${styles.cartItem} ${isRemoving ? styles.fadeOut : ''}`}
      aria-label={`${item.name}, ${item.storage}, ${item.color}, ${item.price} EUR, quantity ${item.quantity}`}
    >
      <div className={styles.imageSection}>
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={`${item.name} - ${item.color}`}
            width={280}
            height={280}
            className={
              isRedmi ? styles.phoneImageRedmi : styles.phoneImageDefault
            }
            priority
          />
        ) : (
          <div
            className={styles.imagePlaceholder}
            aria-label="No image available"
            role="img"
          />
        )}
      </div>

      <div className={styles.contentSection}>
        <div className={styles.header}>
          <h3 className={styles.itemName}>{item.name}</h3>
          <div className={styles.itemDetails}>
            <span>{item.storage}</span>
            <span className={styles.separator} aria-hidden="true">
              |
            </span>
            <span>{item.color}</span>
          </div>
          <p
            className={styles.itemPrice}
            aria-label={`Price: ${item.price} EUR`}
          >
            {item.price} EUR
          </p>
          <p
            className={styles.itemQuantity}
            aria-label={`Quantity: ${item.quantity}`}
          >
            X{item.quantity}
          </p>
        </div>

        <div className={styles.footer}>
          <button
            onClick={handleRemove}
            className={styles.removeBtn}
            aria-label={`Remove ${item.name} from cart`}
            disabled={isRemoving}
            aria-disabled={isRemoving}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
