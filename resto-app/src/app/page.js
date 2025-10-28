"use client";
import Image from "next/image";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <CustomerHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-400 to-red-500 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
          🍴 Food Delivery App
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          {/* Location Input */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Select Place"
              onClick={() => setShowLocation(true)}
              className="w-full px-4 py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {showLocation && (
              <ul className="absolute z-10 bg-white text-gray-800 mt-2 rounded-lg shadow-lg w-full max-h-48 overflow-y-auto">
                {locations.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleListItem(item)}
                    className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            onChange={(event) =>
              loadRestaurants({ restaurant: event.target.value })
            }
            placeholder="Enter Food or Restaurant Name"
            className="w-full max-w-md px-4 py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
      </section>

      {/* Restaurant List */}
      <section className="flex-1 px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          🍔 Available Restaurants
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((item) => (
            <div
              key={item._id || item.id}
              onClick={() =>
                router.push("explore/" + item.name + "?id=" + item._id)
              }
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 cursor-pointer border border-gray-100 hover:-translate-y-1"
            >
              <div className="mb-3">
                <h3 className="text-xl font-bold text-orange-600">
                  {item.name}
                </h3>
                <h5 className="text-sm text-gray-600">📞 {item.contact}</h5>
              </div>
              <div className="text-gray-700 text-sm">
                <p>
                  📍 {item.city}, {item.address}
                </p>
                <p className="mt-1 text-gray-500">✉️ {item.email}</p>
              </div>
            </div>
          ))}
        </div>

        {restaurants.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No restaurants found. Try a different location or search term.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
