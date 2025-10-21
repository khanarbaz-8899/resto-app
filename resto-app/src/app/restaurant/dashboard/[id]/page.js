"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

const EditFoodItems = (props) => {
    const params = use(props.params);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        handleLoadFoodItem();
    }, []);

    const handleLoadFoodItem = async () => {
        try {
            let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + params.id);
            
            if (!response.ok) {
                console.error("Failed to fetch food item:", response.status);
                return;
            }
            
            response = await response.json();
            if (response.success) {
                console.log(response.result);
                setName(response.result.name)
                setPrice(response.result.price)
                setPath(response.result.img_path)
                setDescription(response.result.description)
            }
        } catch (error) {
            console.error("Error loading food item:", error);
        }
    }

    const handleEditFoodItems = async () => {
        console.log(name, price, path, description);
        if (!name || !price || !path || !description) {
            setError(true);
            return false
        } else {
            setError(false)
        }
        
        setLoading(true);
        try {
            console.log("Sending PUT request with data:", { name, price, img_path: path, description });
            
            let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + params.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, price, img_path: path, description})
            });
            
            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);
            
            // Get response as text first to see what we're getting
            const responseText = await response.text();
            console.log("Response text:", responseText);
            
            // Try to parse it as JSON
            if (responseText) {
                const data = JSON.parse(responseText);
                console.log("Parsed data:", data);
                
                if (data.success) {
                    alert("Data has been updated");
                    router.push("../dashboard");
                } else {
                    alert("Failed to update data");
                }
            } else {
                console.error("Empty response received");
                alert("Error: Server returned empty response");
            }
            
        } catch (error) {
            console.error("Error updating food item:", error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
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
                <button className="button" onClick={handleEditFoodItems} disabled={loading}>
                    {loading ? "Updating..." : "Update Food Items"}
                </button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={() => router.push("../dashboard")}>Back to food item list</button>
            </div>
        </div>
    )
}
export default EditFoodItems;