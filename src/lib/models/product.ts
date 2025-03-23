export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
  isNew?: boolean;
  onSale?: boolean;
  originalPrice?: number;
  info: string;
  CollectionId: number; // Add CollectionId
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  user_id?: string;
  product?: {
    id: number;
    name: string;
    price: number;
    image: string;
    info: string;
  };
}

export interface Collection {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}
