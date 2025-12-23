
export interface Product {
  id: string;
  brand: string;
  name: string;
  price: string;
  image: string;
  matchScore: number;
  category: string;
  description: string;
  ingredients: string[];
  aiReasoning?: string;
  productUrl?: string;
  rating?: number;
  reviewCount?: number;
}

export interface SearchResult {
  query: string;
  products: Product[];
  groundingSources: Array<{
    title: string;
    uri: string;
  }>;
}

export interface SoleilResponse {
  message: string;
  products: Product[];
  suggestions?: string[];
}

export enum Gender {
  FEMALE = 'female',
  MALE = 'male'
}

export interface BeautyProfile {
  skinType: string;
  skinConcern: string;
  hairType: string;
  hairConcern: string;
  isComplete: boolean;
}

export interface AppState {
  gender: Gender;
  searchHistory: string[];
  savedProducts: string[];
}
