// Logout component with Thanks for visiting and Logout button
// use bootstrap classes for styling
// clear AuthContext when component mounts

import { useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        setUser(null);
    }, []);

    return (
        <div className="container">
            <h2>Thanks for visiting</h2>
            <button className="btn btn-primary" onClick={() => navigate("/login")}>Login Again</button>
        </div>
    );
};

export default Logout;
