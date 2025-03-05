import { writable } from "svelte/store";
import type { CartItem } from "$lib/types/product";

// Check if we're in the browser environment
const isBrowser = typeof window !== "undefined";

export const cart = writable<CartItem[]>([], (set) => {
  if (isBrowser) {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      set(JSON.parse(storedCart));
    }
  }

  return () => { }; // Cleanup function (not needed here)
});

// Only subscribe to localStorage updates in the browser
if (isBrowser) {
  cart.subscribe((value) => {
    localStorage.setItem("cart", JSON.stringify(value));
  });
}

// Utility functions
export function addToCart(item: CartItem) {
  cart.update((items) => {
    const existingItem = items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push(item);
    }
    return [...items];
  });
}

export function removeFromCart(id: number) {
  cart.update((items) => items.filter((item) => item.id !== id));
}
