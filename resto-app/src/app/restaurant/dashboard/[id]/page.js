"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";



const EditFoodItems = (props) => {


    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const router= useRouter();

    const handleEditFoodItems= async ()=>{
        console.log(name,price,path,description);
        if(!name || !price || !path || !description){
            setError(true);
            return false
        }else{
            setError(false)
        }
       
    }
    return (
        <div className="container">
            <h1>Update Food Items</h1>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Food Name" className="input-field"
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                {
                    error && !name && <span className="input-error">Please Enter Valid Name</span>
                }
            </div>
              <div className="input-wrapper">
                <input type="number" placeholder="Enter Price" className="input-field"
                    value={price} onChange={(e) => setPrice(e.target.value)}
                />
                {
                    error && !price && <span className="input-error">Please Enter Valid Price</span>
                }
            </div>
              <div className="input-wrapper">
                <input type="text" placeholder="Enter Image Path" className="input-field"
                    value={path} onChange={(e) => setPath(e.target.value)}
                />
                {
                    error && !path && <span className="input-error">Please Enter Valid Path</span>
                }
            </div>
              <div className="input-wrapper">
                <input type="text" placeholder="Enter Description" className="input-field"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                />
                {
                    error && !description && <span className="input-error">Please Enter Valid Description</span>
                }
            </div>
              <div className="input-wrapper">
            <button className="button" onClick={handleEditFoodItems}>Update Food Items</button>
            </div>
            <div className="input-wrapper">
            <button className="button" onClick={()=>router.push("../dashboard")}>Back to food item list</button>
            </div>
        </div>
    )
}
export default EditFoodItems;