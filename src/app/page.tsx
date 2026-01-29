import { getPhones } from '@/features/phones/services/phones.service';
import PhoneGrid from '@/features/phones/components/PhoneGrid';

async function HomePage() {
  try {
    const phones = await getPhones({ limit: 20 });
    return (
      <main className="container">
        <PhoneGrid phones={phones} />
      </main>
    );
  } catch (error) {
    return (
      <main className="container">
        <h1>Error</h1>
        <p>
          {error instanceof Error ? error.message : 'Error al cargar teléfonos'}
        </p>
      </main>
    );
  }
}
export default HomePage;
