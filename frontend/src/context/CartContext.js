import React, { createContext, useState, useEffect } from 'react';

// Create a new context for the cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize the cart state with the value from local storage or an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save the cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.count || 1), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
