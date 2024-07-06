import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (service) => {
    setCart((prevCart) => {
      if (prevCart.some(item => item.id === service.id)) {
        return prevCart; // Service already in cart, do nothing
      }
      return [...prevCart, service];
    });
  };

  const removeFromCart = (serviceId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== serviceId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
