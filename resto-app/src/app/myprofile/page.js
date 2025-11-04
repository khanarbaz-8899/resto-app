"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const ProfilePage = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    try {
      const userStorage= JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        "http://localhost:3000/api/order?id="+userStorage.id
      );
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setMyOrders(data.data);
      } else {
        setMyOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setMyOrders([]);
    }
  };
  const removeOrder = async (orderId) => {
  const confirmDelete = window.confirm("Are you sure you want to remove this order?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:3000/api/order?id=${orderId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      alert("Order removed successfully!");
      setMyOrders((prev) => prev.filter((order) => order._id !== orderId));
    } else {
      alert(result.message || "Failed to remove order. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    alert("Something went wrong while deleting the order.");
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-gray-100">
      <CustomerHeader />

      <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
            🍕 My Orders
          </h2>
          <div className="text-sm text-gray-600">
            {myOrders.length} order{myOrders.length !== 1 && "s"} found
          </div>
        </div>

        {myOrders.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {myOrders.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-orange-600">
                      {item.restaurant?.name || "Unknown Restaurant"}
                    </h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        item.status === "confirm"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="border-t pt-3 mt-2">
                    <p className="text-gray-700 font-medium">
                      💰 Amount: <span className="text-gray-900">₹{item.amount}</span>
                    </p>
                   
                  </div>
                </div>

                {/* Footer strip */}
                <div className="bg-orange-50 px-6 py-3 flex justify-between items-center border-t border-orange-100">
                  <p className="text-sm text-gray-600">
                    📅 Ordered on: <span className="font-medium">Recently</span>
                  </p>
                  <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition">
                    View Details →
                  </button>
                   <button
                      onClick={() => removeOrder(item._id)}
                      className="text-sm font-semibold text-red-500 hover:text-red-600 transition"
                    >
                      🗑 Remove
                    </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center mt-12"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty"
              className="w-32 mb-4 opacity-70"
            />
            <p className="text-gray-600 text-lg">You have no orders yet.</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
