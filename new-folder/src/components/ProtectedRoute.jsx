import { Link } from "react-router"
import { useAuth } from "../providers/AuthProvider"

function ProtectedRoute(props) {
    const {user} = useAuth()
    return <div>
        {
            user ? 
            props.children : 
            <div>
                <h3>Unauthorized Access</h3>
                <p>Please login to access the component.</p>
                <Link to="/login" className="btn btn-primary">Login Here</Link>
            </div>
        }
    </div>
}
export default ProtectedRoute
