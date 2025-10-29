"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";

const CartPage = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // ✅ Check login status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        router.push("/auth"); // Redirect to login/signup page
      }
    }
  }, [router]);

  // ✅ Load cart data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartStorage(JSON.parse(storedCart));
      }
    }
  }, []);

  // ✅ Recalculate total when cart changes
  useEffect(() => {
    const totalAmount = cartStorage.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalAmount);
  }, [cartStorage]);

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Handle Checkout
  const handleCheckout = () => {
  router.push("/login?redirect=order");

  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-orange-100">
      <CustomerHeader />

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-10">
          🛒 Your Food Cart
        </h1>

        {cartStorage.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {cartStorage.map((item, index) => (
              <div
                key={item._id || index}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-5 flex items-center space-x-4"
              >
                {/* Food Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.img_path}
                    alt={item.name}
                    className="w-28 h-28 rounded-xl object-cover border border-gray-200"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-orange-600">
                      ₹{item.price}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src="/empty-cart.png"
              alt="Empty Cart"
              className="w-52 h-52 mb-6 opacity-80"
            />
            <h1 className="text-2xl font-semibold text-gray-600">
              Your cart is empty 😢
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Add some delicious food to make your tummy happy!
            </p>
          </div>
        )}

        {/* ✅ Order Summary */}
        {cartStorage.length > 0 && (
          <div className="mt-12 max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-orange-500 text-3xl">💰</span> Order Summary
            </h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Food Charges:</span>
                <span className="font-medium">₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({TAX}%):</span>
                <span className="font-medium">₹{(total * TAX) / 100}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="font-medium">₹{DELIVERY_CHARGES}</span>
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total Amount:</span>
                <span>
                  ₹{total + DELIVERY_CHARGES + (total * TAX) / 100}
                </span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-10 py-3 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Proceed to Checkout 🍽️
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
