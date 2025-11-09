import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { findUserByCredentials, updateUserProfile } from "../services/users";
import { toast } from "react-toastify";

function UpdateProfile() {
  // use formData object to maintain the state of the form fields
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // componentDidMount()
  useEffect(() => {
    // get user info from context and
    // update user info in state
    setFormData({ name: user.name, mobile: user.mobile });
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
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            mobile
          </label>
          <input
            type="mobile"
            className="form-control"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
