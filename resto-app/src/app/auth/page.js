"use client";
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserLogin from "../_components/UserLogin";
import UserSignUp from "../_components/UserSignUp";

export default function AuthPage() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      <CustomerHeader />

      <div className="text-center my-6">
        <h1 className="text-2xl font-bold mb-4">
          {login ? "User Login" : "User SignUp"}
        </h1>

        {/* Toggle Buttons */}
        {/* <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setLogin(true)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              login
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setLogin(false)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              !login
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div> */}
      </div>

      {/* ✅ Render Correct Form */}
      {login ? (
        <UserLogin switchToSignup={() => setLogin(false)} />
      ) : (
        <UserSignUp switchToLogin={() => setLogin(true)} />
      )}

      <Footer />
    </div>
  );
}
