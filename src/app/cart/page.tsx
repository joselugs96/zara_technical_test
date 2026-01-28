'use client';

import { Suspense } from 'react';
import { useCart } from '@/shared/context/CartContext';
import CartGrid from '@/features/cart/components/CartGrid';
import CartFooter from '@/features/cart/components/CartFooter';
import styles from './page.module.scss';

function CartPage() {
  const { items, isHydrated } = useCart();

  if (!isHydrated) {
    return <></>;
  }

  return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<div />}>
        <main className={styles.mainContent}>
          <div className="container">
            <CartGrid items={items} />
          </div>
        </main>
        <CartFooter />
      </Suspense>
    </div>
  );
}

export default CartPage;
