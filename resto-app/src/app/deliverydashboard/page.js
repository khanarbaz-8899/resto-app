"use client";

import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";

const DeliveryOrdersPage = () => {
  const router = useRouter();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const deliveryData = JSON.parse(localStorage.getItem("delivery"));
    if (!deliveryData) {
      router.push("/deliverydashboard");
    } else {
      getMyOrders(deliveryData._id);
    }
  }, []);

  const getMyOrders = async (id) => {
    try {
      const response = await fetch(`/api/deliveryPartners/orders/${id}`);
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

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/deliveryPartners/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        getMyOrders(JSON.parse(localStorage.getItem("delivery"))._id);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-6">
      <DeliveryHeader />
      <h1 className="text-2xl font-bold my-4">My Order List</h1>

      {myOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        myOrders.map((item) => (
          <div
            key={item._id}
            className="p-4 mb-4 bg-gray-800 text-white rounded-lg"
          >
            <h4>
              <span className="font-semibold">Restaurant:</span>{" "}
              {item.restaurant?.name || "Unknown"}
            </h4>
            <div>
              <span className="font-semibold">Amount:</span> ₹{item.amount}
            </div>
            <div>
              <span className="font-semibold">Address:</span>{" "}
              {item.data?.address || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {item.status}
            </div>

            <div className="mt-2">
              <label className="mr-2 font-semibold">Update Status:</label>
              <select
                value={item.status}
                onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                className="text-black px-2 py-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="confirm">Confirm</option>
                <option value="on_the_way">On The Way</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DeliveryOrdersPage;
