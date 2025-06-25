export interface Product {
  id: number;
  title: string;
  description: string;
  category: string; // TODO: update with an enum value
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  tags?: string[]; // TODO: update with an enum value
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimentions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews?: Review[];
  returnPolicy: ReturnPolicy;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export enum Category {
  fragrances = 'fragrances',
  beauty = 'beauty',
  groceries = 'groceris'
}

export const allCategories  = Object.keys(Category);

export enum AvailabilityStatus {
  IN_STOCK = 'In Stock',
  OUT_OF_STOCK = 'Out of Stock',
}

export enum ReturnPolicy {
  NO_RETURN = 'No return policy',
  DAYS_14 = '14 days return policy',
  DAYS_7 = '7 days return policy',
  DAYS_30 = '30 days return policy',
  DAYS_60 = '60 days return policy',
  DAYS_90 = '90 days return policy',
}

export interface Dimentions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
