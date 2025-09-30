
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    city: string;
    district: string;
    address: string;
  };
  type: 'villa' | 'apartment';
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  images: string[];
  amenities: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface SearchFilters {
  city?: string;
  type?: 'villa' | 'apartment' | 'all';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  amenities?: string[];
}
