"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartStorage = localStorage.getItem("cart");
      if (cartStorage) {
        try {
          const parsedCart = JSON.parse(cartStorage);
          setCartItem(Array.isArray(parsedCart) ? parsedCart : [parsedCart]);
          setCartNumber(Array.isArray(parsedCart) ? parsedCart.length : 1);
        } catch (error) {
          console.error("Error parsing cart:", error);
          setCartItem([]);
          setCartNumber(0);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (props.cartData && props.cartData.length > 0) {
      const newItem = props.cartData[props.cartData.length - 1];

      if (cartNumber > 0) {
        if (cartItem[0].resto_id !== newItem.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([newItem]);
          localStorage.setItem("cart", JSON.stringify([newItem]));
        } else {
          const updatedCart = [...cartItem, newItem];
          setCartItem(updatedCart);
          setCartNumber(updatedCart.length);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      } else {
        setCartNumber(1);
        setCartItem([newItem]);
        localStorage.setItem("cart", JSON.stringify([newItem]));
      }
    }
  }, [props.cartData]);

  useEffect(() => {
    if (props.removeCartData) {
      let localCartItem = cartItem.filter(
        (item) => item._id != props.removeCartData
      );
      setCartItem(localCartItem);
      setCartNumber(localCartItem.length);
      if (localCartItem.length === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(localCartItem));
      }
    }
  }, [props.removeCartData]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="App Logo"
            className="w-13 h-12  object-cover shadow-sm"
          />
          <h2 className="text-2xl font-bold text-orange-500 tracking-wide">
            FoodieXpress
          </h2>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li className="hover:text-orange-500 transition">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-orange-500 transition">
              <Link href="/login">Login</Link>
            </li>
            <li className="hover:text-orange-500 transition">
              <Link href="/signup">Sign Up</Link>
            </li>
            <li className="hover:text-orange-500 transition relative">
              <Link href={cartNumber ? "/cart" : "#"}>
                Cart
                <span className="absolute -top-3 -right-4 bg-orange-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                  {cartNumber}
                </span>
              </Link>
            </li>
            <li className="hover:text-orange-500 transition">
              <Link href="/add-restaurant">Add Restaurant</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default CustomerHeader;
