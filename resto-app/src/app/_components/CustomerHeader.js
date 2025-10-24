"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);

    // Initialize cart from localStorage only on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartStorage = localStorage.getItem('cart');
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
            const newItem = props.cartData[props.cartData.length - 1]; // Get the last added item

            if (cartNumber > 0) {
                // Check if different restaurant
                if (cartItem[0].resto_id !== newItem.resto_id) {
                    localStorage.removeItem("cart");
                    setCartNumber(1);
                    setCartItem([newItem]);
                    localStorage.setItem("cart", JSON.stringify([newItem]));
                } else {
                    // Same restaurant - add to cart
                    const updatedCart = [...cartItem, newItem];
                    setCartItem(updatedCart);
                    setCartNumber(updatedCart.length);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
            } else {
                // First item in cart
                setCartNumber(1);
                setCartItem([newItem]);
                localStorage.setItem("cart", JSON.stringify([newItem]));
            }
        }
    }, [props.cartData]);

    useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id != props.removeCartData
            });
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem("cart", JSON.stringify(localCartItem))
            if (localCartItem.length == 0) {
                localStorage.removeItem("cart")
            }
        }
    }, [props.removeCartData])

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 90 }} src="/logo.jpg" alt="Logo" />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/">Login</Link>
                </li>
                <li>
                    <Link href="/">SignUp</Link>
                </li>
                <li>
                    <Link href= {cartNumber?"/cart":"#"}>Cart({cartNumber})</Link>
                </li>
                <li>
                    <Link href="/">Add Restaurant</Link>
                </li>
            </ul>
        </div>
    );
};

export default CustomerHeader;