import Link from 'next/link';
import { useCart } from '@/shared/context/CartContext';
import styles from './CartFooter.module.scss';
import { ROUTES } from '@/shared/lib/routes';

function CartFooter() {
  const { totalPrice, totalItems } = useCart();
  const hasItems = totalItems > 0;

  return (
    <div className={styles.cartFooter}>
      <Link href={ROUTES.home} className={styles.continueBtn}>
        CONTINUE SHOPPING
      </Link>
      <div
        className={`${styles.totalSection} ${hasItems ? styles.visible : styles.hidden}`}
      >
        <span className={styles.totalLabel}>TOTAL</span>
        <span className={styles.totalPrice}>{totalPrice} EUR</span>
      </div>
      <button
        className={`${styles.payBtn} ${hasItems ? styles.visible : styles.hidden}`}
      >
        PAY
      </button>
    </div>
  );
}

export default CartFooter;
