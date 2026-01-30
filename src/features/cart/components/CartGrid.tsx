import { CartItem } from '@/shared/lib/types';
import { useCart } from '@/shared/context/CartContext';
import CartItemComponent from './CartItem';
import styles from './CartGrid.module.scss';

interface CartGridProps {
  items: CartItem[];
}

function CartGrid({ items }: CartGridProps) {
  const { removeItem, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <section className={styles.cartGrid} aria-label="Shopping cart">
        <div className={styles.cartHeader}>
          <h2 className={styles.cartHeader}>CART (0)</h2>
          <div className="sr-only" role="status" aria-live="polite">
            <p>Your cart is empty. Continue shopping to add items.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.cartGrid} aria-label="Shopping cart items">
      <div className={styles.cartHeader}>
        <h2>
          CART ({totalItems})
          <span className="sr-only">
            , {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
          </span>
        </h2>
      </div>

      <ul
        className={styles.gridContainer}
        role="list"
        aria-label="Cart items list"
      >
        {items.map((item) => (
          <li key={`${item.id}-${item.color}-${item.storage}`} role="listitem">
            <CartItemComponent
              item={item}
              onRemove={() =>
                removeItem({
                  id: item.id,
                  color: item.color,
                  storage: item.storage,
                })
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CartGrid;
