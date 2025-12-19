
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
}

export interface SearchResult {
  query: string;
  products: Product[];
  groundingSources: Array<{
    title: string;
    uri: string;
  }>;
}

export enum Gender {
  FEMALE = 'female',
  MALE = 'male'
}

export interface AppState {
  gender: Gender;
  searchHistory: string[];
  savedProducts: string[];
}
