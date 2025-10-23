"use client"
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
    const [cartData, setCartData] = useState([]) // Changed from "" to []

    useEffect(() => {
        loadRestaurantDetails();
    }, [id]); // Added id dependency

    const loadRestaurantDetails = async () => {
        try {
            let response = await fetch("http://localhost:3000/api/customer/" + id)
            response = await response.json();
            if (response.success) {
                setRestaurantDetails(response.details)
                setFoodItems(response.foodItems)
            }
        } catch (error) {
            console.error("Error loading restaurant details:", error);
        }
    }
    
    const addToCart = (item) => {
        setCartData([...cartData, item]) // Changed to add items to array
    }
    
    return (
        <div>
            <CustomerHeader cartData={cartData}/>
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="detail-wrapper">
                <h3>Contact: {restaurantDetails?.contact}</h3>
                <h3>City: {restaurantDetails?.city}</h3>
                <h3>Address: {restaurantDetails?.address}</h3>
                <h3>Email: {restaurantDetails?.email}</h3>
            </div>
            <div className="food-item-wrapper">
                {
                    foodItems.length > 0 ? foodItems.map((item, index) => ( // Added index key
                        <div className="list-item" key={index}>
                            <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
                            <div>
                                <div>{item.name}</div>
                                <div>{item.price}</div>
                                <div className="description">{item.description}</div>
                                <button onClick={() => addToCart(item)}>Add To Cart</button>
                            </div>
                        </div>
                    ))
                    : <h1>No Food Item Added For Now</h1>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Page;