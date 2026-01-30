import Link from 'next/link';
import Image from 'next/image';
import styles from './SimilarProducts.module.scss';
import {
  SimilarProduct,
  SimilarProductsProps,
} from '@/features/phone-detail/lib/types';
import { ROUTES } from '@/shared/lib/routes';

function SimilarProducts({ products }: SimilarProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  const uniqueProducts = Array.from(
    new Map(products.map((product) => [product.id, product])).values()
  );

  const getImageClassName = (product: SimilarProduct) => {
    const isRedmi =
      product.brand.toLowerCase().includes('xiaomi') ||
      product.name.toLowerCase().includes('redmi');

    if (isRedmi) return styles.phoneImageRedmi;
    return styles.phoneImageDefault;
  };

  return (
    <section
      className={styles.similarProductsContainer}
      aria-label="Similar products"
    >
      <h2 className={styles.title}>SIMILAR ITEMS</h2>

      <ul className={styles.productsGrid} role="list">
        {uniqueProducts.map((product) => (
          <li key={product.id} role="listitem">
            <Link
              href={ROUTES.phoneDetail(product.id)}
              className={styles.productCard}
              aria-label={`${product.brand} ${product.name} - ${product.basePrice} EUR`}
            >
              <article className={styles.productsContent}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={product.imageUrl}
                    alt={`${product.name} by ${product.brand}`}
                    fill
                    className={getImageClassName(product)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className={styles.productInfo}>
                  <p className={styles.brand}>{product.brand}</p>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.price}>{product.basePrice} EUR</p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SimilarProducts;
