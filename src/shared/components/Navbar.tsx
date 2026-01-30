'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/shared/context/CartContext';
import { ROUTES } from '@/shared/lib/routes';
import styles from './Navbar.module.scss';
import iconoZaraTest from '@/shared/assets/images/icono-zara-test.jpg';
import iconoCart from '@/shared/assets/images/icono-cart.jpg';

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href={ROUTES.home} className={styles.logoLink}>
          <Image
            src={iconoZaraTest}
            alt="Zara Technical Test"
            width={80}
            height={80}
            priority
          />
        </Link>

        <Link href={ROUTES.cart} className={styles.cartLink}>
          <Image
            src={iconoCart}
            alt="Shopping Cart"
            width={45}
            height={45}
            priority
          />
          <span className={styles.cartCount}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
