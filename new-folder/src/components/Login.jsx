// Login component with email and password and login button
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { findUserByCredentials } from "../services/users";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function Login() {
  // use formData object to maintain the state of the form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // login logic here
      const cred = { email: formData.email, password: formData.password };
      const user = await findUserByCredentials(cred);
      // store token in sessionStorage
      sessionStorage.setItem("token", user.token);
      // store whole user object in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));
      // add logged in user in AuthContext
      setUser(user);
      toast.success("Welcome, " + user.firstName);
      navigate("/user/home");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        paddingTop: "100px",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontWeight: "bold" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <div>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Email"
              variant="outlined"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            Dont have account?
            <span
              style={{
                color: "purple",
                fontWeight: "bold",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/register")}
            >
              Register here.
            </span>{" "}
          </div>
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
