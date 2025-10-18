"use client";
import AddFoodItems from "@/app/_components/AddFoodItems";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useState } from "react";


const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);
    return (<div>
        <RestaurantHeader />
        <button onClick={()=>setAddItem(true)}>Add Food</button>
        <button onClick={()=>setAddItem(false)}>Dashboard</button>
        {
            addItem ? <AddFoodItems  setAddItem={setAddItem}/> : <FoodItemList/>
        }


    </div>)
}
export default Dashboard;