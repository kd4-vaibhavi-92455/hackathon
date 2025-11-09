import { useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <h2>Page Not Found</h2>
            <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
        </div>
    );
};

export default NotFound;
