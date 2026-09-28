import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  const [cart, setCart] = useState({
    items: []
  });

  async function refreshCart() {
    if (!user) {
      setCart({ items: [] });
      return;
    }

    try {
      const { data } = await api.get("/cart");
      setCart(data.cart);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart({ items: [] });
    }
  }

  useEffect(() => {
    refreshCart();
  }, [user]);

  async function addToCart(productId, quantity = 1) {
    const { data } = await api.post("/cart", {
      productId,
      quantity
    });

    setCart(data.cart);
  }

  async function updateQuantity(itemId, quantity) {
    const { data } = await api.put(`/cart/${itemId}`, {
      quantity
    });

    setCart(data.cart);
  }

  async function removeItem(itemId) {
    const { data } = await api.delete(`/cart/${itemId}`);

    setCart(data.cart);
  }

  const count = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        subtotal,
        addToCart,
        updateQuantity,
        removeItem,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}