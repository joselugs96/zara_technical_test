'use client';

import { Suspense } from 'react';
import { useCart } from '@/shared/context/CartContext';
import CartGrid from '@/features/cart/components/CartGrid';
import CartFooter from '@/features/cart/components/CartFooter';
import styles from './page.module.scss';

function CartPage() {
  const { items, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div className={styles.pageContainer}>
        <main>
          <h1 className="sr-only">Shopping Cart</h1>
          <div aria-busy="true" aria-label="Loading cart contents...">
            {/* Loading state */}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Suspense
        fallback={
          <p role="status" aria-live="polite">
            Loading cart contents…
          </p>
        }
      >
        <main className={styles.mainContent}>
          <h1 className="sr-only">Shopping Cart</h1>
          <CartGrid items={items} />
        </main>

        <footer>
          <CartFooter />
        </footer>
      </Suspense>
    </div>
  );
}

export default CartPage;
