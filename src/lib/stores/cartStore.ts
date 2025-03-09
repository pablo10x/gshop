import { writable, derived, get } from "svelte/store";
import type { CartItem } from "$lib/models/product";
import { browser } from '$app/environment';

export const cart = writable<CartItem[]>([], (set) => {
  if (browser) {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      set(JSON.parse(storedCart));
    }
  }

  return () => { }; // Cleanup function (not needed here)
});

// Only subscribe to localStorage updates in the browser
if (browser) {
  cart.subscribe((value) => {
    localStorage.setItem("cart", JSON.stringify(value));
  });
}

// Derived store to get the count of items in the cart
export const itemsCount = derived(cart, ($cart) => {
  return $cart.reduce((count, item) => count + item.quantity, 0);
});

// Utility functions
export async function addToCart(item: CartItem) {
  cart.update((items) => {
    const existingItem = items.find((cartItem) => cartItem.id === item.id && cartItem.user_id === item.user_id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push(item);
    }
    return [...items];
  });

  // Save cart item to backend if user is logged in
  if (item.user_id) {
    try {
      await fetch(`/api/cart/${item.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
    } catch (error) {
      console.error('Failed to save cart item to database:', error);
    }

  }
}

export async function removeFromCart(id: number, user_id?: string) {
  cart.update((items) => items.filter((item) => item.id !== id || item.user_id !== user_id));

  // Remove cart item from backend if user is logged in
  if (user_id) {
    await fetch(`/api/cart/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  }
}

export async function loadCart(userId: string) {
  const response = await fetch(`/api/cart/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to load cart');
  }
  const cartItems = await response.json();

  // Only set items that have valid products
  const validCartItems = cartItems.filter((item: CartItem) => item.product);
  cart.set(validCartItems);
}

export async function saveCartToDatabase(userId: string) {
  const cartItems = get(cart);
  for (const item of cartItems) {
    try {
      await fetch(`/api/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: item.id,
          price: item.product?.price || 0,
          quantity: item.quantity,
          user_id: userId
        })
      });
    } catch (error) {
      console.error('Failed to save cart item to database:', error);
    }
  }
}
