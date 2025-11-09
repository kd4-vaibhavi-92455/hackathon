import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../services/users";
import { toast } from "react-toastify";
import { saveFoodItem } from "../services/foods";

function FoodItemForm() {
    // use formData object to maintain the state of the form fields
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        type: "",
        image: null,
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            //debugger;
            // get state data and add in "FormData" object
            const data = new FormData()
            data.append('name', formData.name);
            data.append('price', formData.price);
            data.append('description', formData.description);
            data.append('type', formData.type);
            data.append('image', formData.image);
            // send the FormData object using axios POST req
            const food = await saveFoodItem(data)
            toast.success("Food Added: " + food.fid)
        }
        catch(err) {
            toast.error(err.message)
        }
    };
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    return (
        <div className="container">
            <h2>Food Item</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Type
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0]})}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Food
                </button>
            </form>
        </div>
    );
}    

export default FoodItemForm
