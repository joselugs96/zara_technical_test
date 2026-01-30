import Link from 'next/link';
import { useCart } from '@/shared/context/CartContext';
import styles from './CartFooter.module.scss';
import { ROUTES } from '@/shared/lib/routes';

function CartFooter() {
  const { totalPrice, totalItems } = useCart();
  const hasItems = totalItems > 0;

  return (
    <div className={styles.cartFooter} aria-label="Cart summary and checkout">
      <Link
        href={ROUTES.home}
        className={styles.continueBtn}
        aria-label="Continue shopping - return to products"
      >
        CONTINUE SHOPPING
      </Link>

      <div
        className={`${styles.totalSection} ${hasItems ? styles.visible : styles.hidden}`}
        role="region"
        aria-label="Order total"
        aria-hidden={!hasItems}
      >
        <span className={styles.totalLabel} id="total-label">
          TOTAL
        </span>
        <span
          className={styles.totalPrice}
          aria-labelledby="total-label"
          aria-live="polite"
        >
          {totalPrice} EUR
        </span>
      </div>

      <button
        className={`${styles.payBtn} ${hasItems ? styles.visible : styles.hidden}`}
        disabled={!hasItems}
        aria-disabled={!hasItems}
        aria-label={
          hasItems
            ? `Proceed to payment - Total: ${totalPrice} EUR`
            : 'Add items to cart to proceed to payment'
        }
      >
        PAY
      </button>
    </div>
  );
}

export default CartFooter;
