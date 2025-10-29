"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // ✅ Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login"); // redirect if not logged in
    }

    if (storedCart) {
      const cartData = JSON.parse(storedCart);
      setCart(cartData);
      const cartTotal = cartData.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(cartTotal);
    }
  }, [router]);

  const handleConfirmOrder = () => {
    alert("✅ Order placed successfully!");
    localStorage.removeItem("cart"); // clear cart
    router.push("/"); // redirect to home
  };

  if (!user) return null; // wait for user data

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-orange-400 mb-8">
          🧾 Order Summary
        </h1>

        {/* ✅ User Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-orange-300 mb-4">
            👤 Customer Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-200">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">City:</span> {user.city}</p>
            <p><span className="font-semibold">Address:</span> {user.address}</p>
            <p><span className="font-semibold">Contact:</span> {user.contact}</p>
          </div>
        </div>

        {/* ✅ Cart Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-orange-300 mb-4">
            🛒 Order Items
          </h2>
          {cart.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white/10 border border-white/20 rounded-lg p-3"
                >
                  <p className="capitalize">{item.name}</p>
                  <p>
                    {item.quantity} × ₹{item.price} ={" "}
                    <span className="font-semibold text-orange-400">
                      ₹{item.price * item.quantity}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Your cart is empty.</p>
          )}
        </div>

        {/* ✅ Total and Confirm Button */}
        <div className="flex justify-between items-center mt-6 border-t border-white/20 pt-4">
          <p className="text-xl font-semibold">
            Total: <span className="text-orange-400">₹{total}</span>
          </p>
          <button
            onClick={handleConfirmOrder}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-orange-500/40"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
