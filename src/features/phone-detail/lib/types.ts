export interface PhoneSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface PhoneColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface PhoneStorageOption {
  capacity: string;
  price: number;
}

export interface SimilarProduct {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface PhoneDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: PhoneSpecs;
  colorOptions: PhoneColorOption[];
  storageOptions: PhoneStorageOption[];
  similarProducts: SimilarProduct[];
}

export interface PhoneInfoProps {
  phone: PhoneDetail;
  onColorChange?: (colorName: string) => void;
}

export interface PhoneGalleryProps {
  imageUrl: string;
  brand: string;
  name: string;
}
