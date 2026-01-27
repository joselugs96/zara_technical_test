import Link from 'next/link';
import Image from 'next/image';
import styles from './SimilarProducts.module.scss';
import { SimilarProduct } from '@/features/phone-detail/lib/types';
import { ROUTES } from '@/shared/lib/routes';

interface SimilarProductsProps {
  products: SimilarProduct[];
}

function SimilarProducts({ products }: SimilarProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  const getImageClassName = (product: SimilarProduct) => {
    const isRedmi =
      product.brand.toLowerCase().includes('xiaomi') ||
      product.name.toLowerCase().includes('redmi');

    if (isRedmi) return styles.phoneImageRedmi;
    return styles.phoneImageDefault;
  };

  return (
    <section className={styles.similarProductsContainer}>
      <h2 className={styles.title}>SIMILAR ITEMS</h2>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={ROUTES.phoneDetail(product.id)}
            className={styles.productCard}
          >
            <article className={styles.productsContent}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={250}
                  height={250}
                  quality={90}
                  className={getImageClassName(product)}
                />
              </div>

              <div className={styles.productInfo}>
                <p className={styles.brand}>{product.brand}</p>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>{product.basePrice} EUR</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SimilarProducts;
