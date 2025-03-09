import { writable } from 'svelte/store';
import type { Product } from '$lib/models/product';

export const products = writable<Product[]>([]);
export const isLoading = writable(false);
export const error = writable<string | null>(null);