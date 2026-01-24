export interface PhoneListItem {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
}
export interface PhoneCardProps {
  phone: PhoneListItem;
}
export interface GetPhonesParams {
  search?: string;
  limit?: number;
  offset?: number;
}

interface Phone {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  basePrice: number;
}

export interface PhoneGridProps {
  phones: Phone[];
}
