export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  isNew: boolean;
  onSale: boolean;
  originalPrice?: number;
}
