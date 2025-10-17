"use client";
import AddFoodItems from "@/app/_components/AddFoodItems";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useState } from "react";


const Dashboard = () => {
    const [addItems, setAddItems] = useState(false);
    return (<div>
        <RestaurantHeader />
        <button onClick={()=>setAddItems(true)}>Add Food</button>
        <button onClick={()=>setAddItems(false)}>Dashboard</button>
        {
            addItems ? <AddFoodItems /> : <h1>Welcome to dashboard</h1>
        }


    </div>)
}
export default Dashboard;