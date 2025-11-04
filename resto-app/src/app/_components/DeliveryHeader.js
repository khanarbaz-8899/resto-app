"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const DeliveryHeader = (props) => {
 

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="App Logo"
            className="w-13 h-12 object-cover shadow-sm"
          />
          <h2 className="text-2xl font-bold text-orange-500 tracking-wide">
            FoodieXpress
          </h2>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6 text-gray-700 font-medium items-center">
            <li className="hover:text-orange-500 transition">
              <Link href="/">Home</Link>
            </li>

           
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default DeliveryHeader;
