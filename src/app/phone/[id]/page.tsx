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
  const phone = await getPhoneDetail(params.id);

  return (
    <main className="container">
      <PhoneDetailContent phone={phone} />
    </main>
  );
}
