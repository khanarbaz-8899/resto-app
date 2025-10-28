"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { use, useEffect, useState } from "react";

const Page = (props) => {
  const params = use(props.params);
  const searchParams = use(props.searchParams);
  const name = params.name;
  const id = searchParams.id;

  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartData(storedCart);
      setCartIds(storedCart.map((item) => item._id));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }, [cartData]);

  useEffect(() => {
    loadRestaurantDetails();
  }, [id]);

  const loadRestaurantDetails = async () => {
    try {
      let response = await fetch(`http://localhost:3000/api/customer/${id}`);
      response = await response.json();
      if (response.success) {
        setRestaurantDetails(response.details);
        setFoodItems(response.foodItems);
      }
    } catch (error) {
      console.error("Error loading restaurant details:", error);
    }
  };

  const addToCart = (item) => {
    const updatedCart = [...cartData, item];
    setCartData(updatedCart);
    setCartIds([...cartIds, item._id]);
    setRemoveCartData(null);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartData.filter((item) => item._id !== id);
    const updatedIds = cartIds.filter((itemId) => itemId !== id);
    setCartData(updatedCart);
    setCartIds(updatedIds);
    setRemoveCartData(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 py-16 text-center text-white shadow-md">
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
          {decodeURI(name)}
        </h1>
        <p className="text-lg opacity-90 font-medium">
          Delicious food delivered fresh to your doorstep 🍕
        </p>
      </div>

      {/* Restaurant Info Card */}
      {restaurantDetails && (
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 mt-10 mb-10 border border-gray-100">
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <p className="text-lg font-semibold">
              📞 Contact:{" "}
              <span className="font-normal">{restaurantDetails.contact}</span>
            </p>
            <p className="text-lg font-semibold">
              🏙️ City:{" "}
              <span className="font-normal">{restaurantDetails.city}</span>
            </p>
            <p className="text-lg font-semibold">
              📍 Address:{" "}
              <span className="font-normal">{restaurantDetails.address}</span>
            </p>
            <p className="text-lg font-semibold">
              ✉️ Email:{" "}
              <span className="font-normal">{restaurantDetails.email}</span>
            </p>
          </div>
        </div>
      )}

      {/* Food Items Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🍔 Explore Our Menu
        </h2>

        {foodItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foodItems.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1"
              >
                {/* Food Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={item.img_path}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    ₹{item.price}
                  </div>
                </div>

                {/* Food Info */}
                <div className="p-5 flex flex-col justify-between min-h-[180px]">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.description || "Delicious meal freshly prepared!"}
                    </p>
                  </div>

                  {/* Add / Remove Cart Buttons */}
                  {cartIds.includes(item._id) ? (
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition-colors font-medium"
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 rounded-xl transition-all font-medium shadow-md"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-12">
            😔 No food items available at the moment.
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Page;
