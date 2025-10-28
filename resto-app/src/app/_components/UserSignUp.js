"use client";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", city:"", address:"",contact:"" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Account created successfully!");
        setFormData({name: "", email: "", password: "", city:"", address:"",contact:"" });
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-orange-900 p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-transform transform hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-400 tracking-wide">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              required
            />
          </div>
           <div>
            <label className="block text-sm text-gray-300 mb-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter Your City"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              required
            />
          </div>
           <div>
            <label className="block text-sm text-gray-300 mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Your Full Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              required
            />
          </div>
           <div>
            <label className="block text-sm text-gray-300 mb-1">Contact</label>
            <input
              type="number"
              name="contact"
              placeholder="Enter Your Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              required
            />
          </div>
          

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-3 rounded-lg font-semibold text-lg text-white transition-all duration-200 ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/50"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center text-sm ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-orange-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
