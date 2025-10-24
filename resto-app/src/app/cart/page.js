"use client"
import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // ✅ Access localStorage only in the browser
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCartStorage(parsedCart);

            // ✅ Calculate total safely
            const totalAmount = parsedCart.reduce((sum, item) => sum + item.price, 0);
            setTotal(totalAmount);
        }
    }, []);

    // ✅ Update total dynamically when cart changes
    useEffect(() => {
        const totalAmount = cartStorage.reduce((sum, item) => sum + item.price, 0);
        setTotal(totalAmount);
    }, [cartStorage]);

    const removeFromCart = (id) => {
        const updatedCart = cartStorage.filter(item => item._id !== id);
        setCartStorage(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div>
            <CustomerHeader />

            <div className="food-item-wrapper">
                {
                    cartStorage.length > 0 ? (
                        cartStorage.map((item, index) => (
                            <div className="list-item" key={item._id || index}>
                                <div className="list-item-block-1">
                                    <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
                                </div>
                                <div className="list-item-block-2">
                                    <div>{item.name}</div>
                                    <div className="description">{item.description}</div>
                                    <button onClick={() => removeFromCart(item._id)}>
                                        Remove From Cart
                                    </button>
                                </div>
                                <div className="list-item-block-3">Price : {item.price}</div>
                            </div>
                        ))
                    ) : (
                        <h1>No Food Item Added For Now</h1>
                    )
                }
            </div>

            <div className="block-1">
                <div className="total-wrapper">
                    <div className="row">
                        <span>Food Charges :</span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax :</span>
                        <span>{(total * TAX) / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges :</span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount :</span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                     <div className="block-2">
                        <button className="order-now">Order Now</button>
                    </div>
                </div>
               

            </div>
            <Footer />
        </div>
    );
};

export default Page;