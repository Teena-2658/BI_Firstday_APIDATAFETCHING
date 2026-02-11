import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const API = "https://bi-firstday-apidatafetching.onrender.com/api/cart";

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /* ---------------- GET CART FROM DB ---------------- */
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setCart(data?.items || []);
  };

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product }),
    });

    const data = await res.json();

    // DB se updated cart lao
    setCart(data.items);
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeFromCart = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setCart(data.items);
  };

  /* ---------------- TOTAL AMOUNT ---------------- */
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
