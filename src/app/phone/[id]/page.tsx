import { getPhoneDetail } from '@/features/phone-detail/services/phoneDetail.service';
import PhoneDetailContent from '@/features/phone-detail/components/PhoneDetailContent';

type PhoneDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function PhoneDetailPage({
  params,
}: PhoneDetailPageProps) {
  try {
    const phone = await getPhoneDetail(params.id);

    return (
      <main id="main-detail-content">
        <h1 className="sr-only">
          Detalle del teléfono {phone.brand} {phone.name}
        </h1>
        <PhoneDetailContent phone={phone} />
      </main>
    );
  } catch {
    return (
      <main id="main-detail-content">
        <p role="alert">No se ha podido cargar el detalle del teléfono.</p>
      </main>
    );
  }
}
