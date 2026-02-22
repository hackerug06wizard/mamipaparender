'use client';

import { useState, useCallback, useEffect } from 'react';

export interface CartItem {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

const CART_STORAGE_KEY = 'mami_papa_cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addItem = useCallback((item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.product_id === item.product_id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.product_id === item.product_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevCart, item];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((i) => i.product_id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((i) =>
          i.product_id === productId ? { ...i, quantity } : i
        )
      );
    }
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoaded,
  };
}
