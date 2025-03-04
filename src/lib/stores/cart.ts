import { writable } from "svelte/store";
import type { CartItem } from "$lib/types/product";

export const cart = writable<CartItem[]>([]);

// Load cart from localStorage on start
if (typeof window !== "undefined") {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart.set(JSON.parse(storedCart));
  }
}

// Automatically save cart to localStorage when it changes
cart.subscribe((value) => {
  localStorage.setItem("cart", JSON.stringify(value));
});

// Utility functions
export function addToCart(item: CartItem) {
  cart.update((items) => {
    const existingItem = items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, add it to the cart
      items.push(item);
    }
    return [...items];
  });
}

export function removeFromCart(id: number) {
  cart.update((items) => items.filter((item) => item.id !== id));
}
