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
    <div className={`${styles.cartItem} ${isRemoving ? styles.fadeOut : ''}`}>
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
          <div className={styles.imagePlaceholder} />
        )}
      </div>

      <div className={styles.contentSection}>
        <div className={styles.header}>
          <h3 className={styles.itemName}>{item.name}</h3>
          <p className={styles.itemDetails}>
            {item.storage} <span className={styles.separator}>|</span>{' '}
            {item.color}
          </p>
          <br />
          <p className={styles.itemPrice}>{item.price} EUR</p>
          <p className={styles.itemQuantity}>X{item.quantity}</p>
        </div>

        <div className={styles.footer}>
          <button
            onClick={handleRemove}
            className={styles.removeBtn}
            title="Eliminar del carrito"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
