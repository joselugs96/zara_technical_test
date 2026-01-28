import { CartItem } from '@/shared/lib/types';
import { useCart } from '@/shared/context/CartContext';
import CartItemComponent from './CartItem';
import styles from './CartGrid.module.scss';

interface CartGridProps {
  items: CartItem[];
}

function CartGrid({ items }: CartGridProps) {
  const { removeItem, totalItems } = useCart();

  return (
    <div className={styles.cartGrid}>
      <div className={styles.cartHeader}>
        <h2>CART ({totalItems})</h2>
      </div>

      {items.length > 0 && (
        <div className={styles.gridContainer}>
          {items.map((item) => (
            <CartItemComponent
              key={`${item.id}-${item.color}-${item.storage}`}
              item={item}
              onRemove={() =>
                removeItem({
                  id: item.id,
                  color: item.color,
                  storage: item.storage,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CartGrid;
