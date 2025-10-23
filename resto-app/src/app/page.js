"use client"
import Image from "next/image";
import styles from "./page.module.css";
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
  }, [])

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result)
    }
  }
  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if(params?.location){
      url = url + "?location=" + params.location
    }else if(params?.restaurant){
      url = url + "?restaurant=" + params.restaurant
    }
    let response = await fetch(url);
    response = await response.json()
    if (response.success) {
      setRestaurants(response.result)
    }
  }
  const handleListItem = (item) => {
    setSelectedLocation(item)
    setShowLocation(false);
    loadRestaurants({location:item})
  }
  console.log(restaurants);

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food delivery App</h1>
        <div className="input-wrapper">
          <input type="text" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="select-input" placeholder="Select Place"
            onClick={() => setShowLocation(true)} />
          <ul className="location-list">
            {
              showLocation && locations.map((item, index) => (
                <li key={index} onClick={() => handleListItem(item)}>{item}</li>
              ))
            }
          </ul>
          <input type="text" className="search-input"
           onChange={()=>loadRestaurants({restaurant:event.target.value})} placeholder="Enter Food Or Restaurant Name" />
        </div>
      </div>
      <div className="restaurant-listing-container">
        {
          restaurants.map((item) => (
            <div key={item._id || item.id} className="restaurant-wrapper" 
            onClick={()=>router.push("explore/"+item.name+"?id="+item._id)}>
              <div className="heading-wrapper">
                <h3>{item.name}</h3>
                <h5>Contact:{item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city}, </div>
                <div className="address">{item.address}, Email: {item.email}</div>

              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </main>
  );
}