"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../restaurant/style.css";



const RestaurantHeader = () => {
  const [details, setDetails] = useState(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    }else if(data && pathName == "/restaurant"){
      router.push("/restaurant/dashboard");
    } else {
      try {
        setDetails(JSON.parse(data)); // ✅ Correct parsing
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        router.push("/restaurant");
      }
    }
  }, []); // ✅ Added dependency array
  
  const logout = () => {
  localStorage.removeItem("restaurantUser");
  router.push("/restaurant")
  }

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: 90 }} src="/logo.jpg" alt="Logo" />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {details && details.name ? (
       <>
       <li><button onClick={logout}>Logout</button></li>
        <li><Link href="/">Profile</Link></li>
       </>
        ) : (
            <li><Link href="/">Login/SignUp</Link></li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
