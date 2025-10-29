"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserLogin = ({ switchToSignup }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Always redirect to order page after login
        router.push("/order");
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-orange-900 p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-400">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-3 rounded-lg font-semibold text-lg text-white transition-all duration-200 ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/50"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <button
            onClick={switchToSignup}
            className="text-orange-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
