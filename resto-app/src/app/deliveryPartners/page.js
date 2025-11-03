"use client";
import { useState } from "react";

const Page = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      console.log({ name, mobile, password, confirmPassword, city, address });
      const res = await fetch("/api/deliveryPartners/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, password, city, address }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Account created successfully!");
        // Fixed: Pass an object to JSON.stringify
        localStorage.setItem("delivery", JSON.stringify({
          name,
          mobile,
          password,
          confirmPassword,
          city,
          address
        }));

      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("❌ Something went wrong!");
    }
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/deliveryPartners/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: loginMobile, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("delivery", JSON.stringify(data));


      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-orange-400 text-center">
        Delivery Partner Portal
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* LOGIN SECTION */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-orange-400/20 transition">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter Mobile"
              value={loginMobile}
              onChange={(e) => setLoginMobile(e.target.value)}
              className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 transition"
            onClick={loginHandle}
          >
            Login
          </button>

        </div>

        {/* SIGNUP SECTION */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-orange-400/20 transition">
          <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Mobile Number</label>
              <input
                type="text"
                placeholder="Enter Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">City</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;