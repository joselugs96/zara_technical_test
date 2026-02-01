'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/shared/context/CartContext';
import { useLoading } from '@/shared/context/LoadingContext';
import { ROUTES } from '@/shared/lib/routes';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';
import iconoNapptilusTest from '@/shared/assets/images/icono-napptilus-test.jpg';
import iconoCart from '@/shared/assets/images/icono-cart.jpg';

function Navbar() {
  const { totalItems } = useCart();
  const { isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();
  const isCartPage = pathname === ROUTES.cart;
  const isHomePage = pathname === ROUTES.home;
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.navbarContainer}>
        <Link
          href={ROUTES.home}
          className={styles.logoLink}
          aria-label="Napptilus Technical Test - Home"
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
            } else {
              setIsLoading(true);
            }
          }}
        >
          <Image
            src={iconoNapptilusTest}
            alt="Napptilus Technical Test Logo"
            width={80}
            height={80}
            priority
          />
        </Link>
        <div className={styles.cartContainer}>
          {isLoading && (
            <div className={styles.loadingSpinner} aria-label="Loading" />
          )}
          <Link
            href={ROUTES.cart}
            className={styles.cartLink}
            aria-label={`Shopping cart with ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            onClick={(e) => {
              if (isCartPage) {
                e.preventDefault();
              } else {
                setIsLoading(true);
              }
            }}
          >
            <div className={styles.cartIconWrapper}>
              <Image
                src={iconoCart}
                alt="Shopping cart icon"
                width={45}
                height={45}
                priority
              />
            </div>
            <span
              className={styles.cartCount}
              aria-hidden="false"
              aria-label={`${totalItems} items in cart`}
            >
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
