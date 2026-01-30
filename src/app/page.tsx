import { getPhones } from '@/features/phones/services/phones.service';
import PhoneGrid from '@/features/phones/components/PhoneGrid';
import PhoneGridSearch from '@/features/phones/components/PhoneGridSearch';
import styles from './page.module.scss';

type HomePageProps = {
  searchParams?: {
    search?: string;
  };
};

async function HomePage({ searchParams }: HomePageProps) {
  try {
    const limit = searchParams?.search ? undefined : 20;
    const phones = await getPhones({ search: searchParams?.search, limit });

    return (
      <main className={styles.pageContainer}>
        <PhoneGridSearch phoneCount={phones.length} />
        <PhoneGrid phones={phones} />
      </main>
    );
  } catch (error) {
    return (
      <main className={styles.pageContainer}>
        <h1>Error</h1>
        <p>
          {error instanceof Error ? error.message : 'Error al cargar teléfonos'}
        </p>
      </main>
    );
  }
}
export default HomePage;
