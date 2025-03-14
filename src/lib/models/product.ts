export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  isNew: boolean;
  onSale: boolean;
  originalPrice?: number;
  info: string;
  categoryId: number; // Add categoryId
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: number;
  user_id?: string;
  product_id: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
  product?: Product; // Joined product data
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}