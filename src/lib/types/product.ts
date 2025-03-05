export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  isNew: boolean;
  onSale: boolean;
  originalPrice?: number;
  info: string; // Optional detailed description
}

// CartItem type for the cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
