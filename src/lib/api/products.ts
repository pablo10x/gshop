import type { Product } from "$lib/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data as Product[];
}
