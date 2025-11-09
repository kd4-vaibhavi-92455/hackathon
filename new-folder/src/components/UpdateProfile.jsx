import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { findUserByCredentials, updateUserProfile } from "../services/users";
import { toast } from "react-toastify";

function UpdateProfile() {
  // use formData object to maintain the state of the form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneno: "",
    address: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // componentDidMount()
  useEffect(() => {
    // get user info from context and
    // update user info in state
    // {"firstName":"Admin","lastName":"User","email":"admin@gmail.com","phoneno":"8226036436","address":"Pune","role":"ROLE_ADMIN","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc2MjY5NDQzNH0.77oiqtO6e68IzUR8xQG3Buw3eT5HYTYUUYgh8qT-7xU"}
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneno: user.phoneno,
      address: user.address,
      firstName: user.firstName,
      firstName: user.firstName,
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault(); // prevent submission of html form
    try {
      // update logic here
      const message = await updateUserProfile(formData);
      setUser({ ...user, name: formData.name, mobile: formData.mobile });
      // also update in sessionStorage ...
      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>My Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneno" className="form-label">
            phoneno
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneno"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
