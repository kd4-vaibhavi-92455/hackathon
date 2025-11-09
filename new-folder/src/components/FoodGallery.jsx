import { useEffect, useState } from "react"
import FoodItem from "./FoodItem"
import { deleteFoodItemById, getAllFoods } from "../services/foods"
import { toast } from "react-toastify"
import { useAuth } from "../providers/AuthProvider"
import { useNavigate } from "react-router"

function FoodGallery() {
    const [foods, setFoods] = useState([])
    const {user} = useAuth()
    const navigate = useNavigate()
    
    // load data from backend when mount
    useEffect(() => {
        async function fetchData() {
            try{
                // call service to get data
                const data = await getAllFoods()
                // then set data into the state
                setFoods(data)
            } catch(err) {
                toast.error(err.message)
            }
        }
        fetchData()
    }, [])

    async function handleDelete(foodId) {
        // call service method to delete
        try{
            const message = await deleteFoodItemById(foodId)
            toast.success(message)
            const remainingFoods = foods.filter(f => f.fid !== foodId)
            setFoods(remainingFoods)
        } catch(err) {
            toast.error(err.message)
        }
    }

    function handleEdit(foodId) {
        const selFoods = foods.filter(f => f.fid === foodId)
        navigate("/user/editfood", {
            state: { 
                item: selFoods[0]
            }
        })
    }

    return <div className="container">
        <div className="row row-cols-4">
            {foods.map((f) => <div key={"box" + f.fid} className="col"> 
                <FoodItem key={f.fid} 
                name={f.name} 
                description={f.description} 
                type={f.type}
                image={f.image}
                price={f.price}
                />
                {
                user.role === 'ROLE_ADMIN' && <div>
                    <button className="btn btn-warning mx-2" onClick={() => handleEdit(f.fid)}>Edit</button>
                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(f.fid)}>Delete</button>
                </div>
                }
            </div>
            )}
        </div>
    </div>
}

export default FoodGallery

