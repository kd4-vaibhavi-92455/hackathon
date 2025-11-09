import { Route, Routes } from "react-router";
import AuthProvider from "./providers/AuthProvider";
import ThemeProvider from "./providers/ThemeProvider";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import UserLayout from "./components/UserLayout";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangeTheme from "./components/ChangeTheme";
import UpdateProfile from "./components/UpdateProfile";
import FoodGallery from "./components/FoodGallery";
import FoodItemForm from "./components/FoodItemForm";
import FoodItemUpdateForm from "./components/FoodItemUpdateForm";
import FavouriteQuotes from "./components/FavouriteQuotes";
import AllQuotes from "./components/AllQuotes";

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/user" element={<UserLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="home"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="favourite-quotes"
                element={
                  <ProtectedRoute>
                    <FavouriteQuotes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="all-quotes"
                element={
                  <ProtectedRoute>
                    <AllQuotes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="foods"
                element={
                  <ProtectedRoute>
                    <FoodGallery />
                  </ProtectedRoute>
                }
              />
              <Route
                path="addfood"
                element={
                  <ProtectedRoute>
                    <FoodItemForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="editfood"
                element={
                  <ProtectedRoute>
                    <FoodItemUpdateForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="theme"
                element={
                  <ProtectedRoute>
                    <ChangeTheme />
                  </ProtectedRoute>
                }
              />
             
             */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
