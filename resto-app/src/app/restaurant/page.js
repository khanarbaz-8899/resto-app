'use client'
import { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSignup";


const Restaurant = () => {
    const [login, setLogin] = useState(true);
    return (
        <>
            <h1>Restaurant Login/SignUp Page</h1>
            {
                login ? <RestaurantLogin /> : <RestaurantSignUp />
            }
            <div>
                <button onClick={()=>setLogin(!login)}>
                {login ? "Do not Have Account? SignUp" : "Already Have Account? Login"}
            </button>
            </div>
        </>
    )
}
export default Restaurant;