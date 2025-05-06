import { useState } from "react";
import axios from "axios";
import "../../assets/css/InventoryMangement/add service.css";
import { Link } from 'react-router-dom';






function AddService() {
    const [order, setOrder] = useState({
        p_id: "",
        name: "",
        price: "",
        quantity: "",
        total: ""
    });

    const [errors, setErrors] = useState({}); // Stores validation messages

    const productOptions = ["Green Tea – 25 Teabags", "Earl Grey – 25 Tea Bags", "Classical Brew – Kenilworth PEKOE", "Pettiagala", "Darjeeling – 30 Pyramid Tea Bags"];

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear error message when user starts typing
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (value.trim() === "") {
            setErrors((prev) => ({
                ...prev,
                [name]: "Please enter this field."
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!order.p_id.trim()) {
            newErrors.p_id = "Please enter this field.";
        }
        if (!order.name.trim()) {
            newErrors.name = "Please enter this field.";
        }
        if (!order.price.trim()) {
            newErrors.price = "Please enter this field.";
        }
        if (!order.quantity.trim()) {
            newErrors.quantity = "Please enter this field.";
        }
        if (!order.total.trim()) {
            newErrors.total = "Please enter this field.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = await axios.post("http://localhost:5000/inventory/order_create", order);
        console.log(data);
        alert("Your details have been added!");
    };

    return (

        

          
        

        <div className="add-service">
            
           
            <h2>Add Inventory Details</h2>
            <form onSubmit={handleSubmit}>
                {/* Product ID Field */}
                <label>Product ID:</label>
                <input 
                    type="text" 
                    id="p_id" 
                    name="p_id" 
                    onChange={handleOnChange} 
                    onBlur={handleBlur}
                />
                {errors.p_id && <span className="error">{errors.p_id}</span>}
                <br />
                
                {/* Product Name Field */}
                <label>Product Name:</label>
                <select 
                    id="name" 
                    name="name" 
                    onChange={handleOnChange} 
                    onBlur={handleBlur}
                >
                    <option value="">Select a product</option>
                    {productOptions.map((product, index) => (
                        <option key={index} value={product}>{product}</option>
                    ))}
                </select>
                {errors.name && <span className="error">{errors.name}</span>}
                <br />
                
                {/* Unit Price Field */}
                <label>Unit Price (LKR):</label>
                <input 
                    type="text" 
                    id="price" 
                    name="price" 
                    onChange={handleOnChange} 
                    onBlur={handleBlur}
                />
                {errors.price && <span className="error">{errors.price}</span>}
                <br />
                
                {/* Net Weight Field */}
                <label>Net Weight (g):</label>
                <input 
                    type="text" 
                    id="quantity" 
                    name="quantity" 
                    onChange={handleOnChange} 
                    onBlur={handleBlur}
                />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
                <br />
                
                {/* In Stock Field */}
                <label>In Stock:</label>
                <input 
                    type="text" 
                    id="total" 
                    name="total" 
                    onChange={handleOnChange} 
                    onBlur={handleBlur}
                />
                {errors.total && <span className="error">{errors.total}</span>}
                <br />
                
                <br /><br /><br />
                <button>Submit</button>
            </form><br />
        </div>
    );
}

export default AddService;




