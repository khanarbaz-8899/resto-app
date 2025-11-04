"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import CustomerHeader from "../_components/CustomerHeader";

const OrderPage = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [removeCartData, setRemoveCartData] = useState(false);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const router = useRouter();

  // ✅ Load user, cart, and delivery partners on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (storedCart) {
      const cartData = JSON.parse(storedCart);
      setCart(cartData);

      // ✅ Safely calculate total
      const cartTotal = cartData.reduce((sum, item) => {
        const price = Number(String(item.price || item.foodPrice || item.cost || 0).replace(/[^\d.-]/g, "")) || 0;
        const qty = Number(String(item.quantity || item.qty || 1).replace(/[^\d.-]/g, "")) || 0;
        return sum + price * qty;
      }, 0);
      setTotal(cartTotal);
    }

    // ✅ Fetch delivery partners based on user's city
    const fetchDeliveryPartners = async () => {
      try {
        const city = parsedUser.city;
        const response = await fetch(`http://localhost:3000/api/deliveryPartners/${city}`);
        const data = await response.json();
        console.log("Fetched Delivery Partners:", data);

        const partners = data.result || data.data || [];
        setDeliveryPartners(partners);
      } catch (error) {
        console.error("Error fetching delivery partners:", error);
      }
    };

    fetchDeliveryPartners();
  }, [router]);

const orderNow = async () => {
  try {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (!storedUser) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    if (!storedCart) {
      alert("Your cart is empty");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    const cartData = JSON.parse(storedCart);

    if (!Array.isArray(cartData) || cartData.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // fetch delivery partners for the user's city
    const city = parsedUser.city;
    const response = await fetch(`http://localhost:3000/api/deliveryPartners/${city}`);
    const deliveryBoyResponse = await response.json();
    console.log("🧾 Delivery Partner API Response:", deliveryBoyResponse);

    const partners = deliveryBoyResponse.result || deliveryBoyResponse.data || [];
    if (!partners.length) {
      alert("No delivery partners available in your city");
      return;
    }

    const selectedDeliveryBoy = partners[0];

    // compute totals
    const cartTotal = cartData.reduce((sum, item) => {
      const price = Number(String(item.price || item.foodPrice || item.cost || 0).replace(/[^\d.-]/g, "")) || 0;
      const qty = Number(String(item.quantity || item.qty || 1).replace(/[^\d.-]/g, "")) || 0;
      return sum + price * qty;
    }, 0);

    const delivery = Number(DELIVERY_CHARGES) || 0;
    const tax = Number(TAX) || 0;
    const amount = cartTotal + delivery + tax;

    const collection = {
      user_id: parsedUser.id || parsedUser._id,
      restaurantId: cartData[0].resto_id,
      foodItemIds: cartData.map((item) => item._id),
      deliveryBoyId: selectedDeliveryBoy._id || selectedDeliveryBoy.id,
      status: "confirm",
      amount,
    };

    const orderResponse = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collection),
    });

    if (!orderResponse.ok) throw new Error(`HTTP error! status: ${orderResponse.status}`);
    const data = await orderResponse.json();

    if (data.success) {
      alert("✅ Order Confirmed");
      setRemoveCartData(true);
      router.push("/deliverydashboard");
    } else {
      alert("Order Failed: " + (data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Order error:", error);
    alert("Order Failed: " + error.message);
  }
};


  if (!user) return null;
  

  // ✅ JSX Rendering
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 text-white p-8">
      <CustomerHeader removeCartData={removeCartData} />
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
              {cart.map((item, index) => {
                const price = Number(String(item.price).replace(/[^\d.-]/g, "")) || 0;
                const qty = Number(String(item.quantity).replace(/[^\d.-]/g, "")) || 0;
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white/10 border border-white/20 rounded-lg p-3"
                  >
                    <p className="capitalize">{item.name}</p>
                    <p>
                      {qty} × ₹{price} ={" "}
                      <span className="font-semibold text-orange-400">
                        ₹{price * qty}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">Your cart is empty.</p>
          )}
        </div>

        {/* ✅ Total and Confirm Button */}
        <div className="flex justify-between items-center mt-6 border-t border-white/20 pt-4">
          <p className="text-xl font-semibold">
            Total:{" "}
            <span className="text-orange-400">
              ₹{total + Number(DELIVERY_CHARGES) + Number(TAX)}
            </span>
          </p>
          <button
            onClick={orderNow}
            disabled={cart.length === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
