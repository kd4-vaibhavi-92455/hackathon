// Navbar component with Logout button
// use bootstrap classes for styling

import { Link } from "react-router";

export default function Navbar() {
    return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/user/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/foods" className="nav-link">Food Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/addfood" className="nav-link">Add Food</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/theme" className="nav-link">Theme</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
    );
}

