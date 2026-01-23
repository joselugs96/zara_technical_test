export interface PhoneListItem {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
}

export interface GetPhonesParams {
  search?: string;
  limit?: number;
  offset?: number;
}
