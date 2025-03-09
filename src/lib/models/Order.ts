import type { Product } from '$lib/models/product';

export interface Order {
  id: string;
  user_id: string;
  products: Product[];
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  created_at: string;
}