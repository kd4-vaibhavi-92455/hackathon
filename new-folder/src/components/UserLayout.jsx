import { Outlet } from "react-router";
// import Navbar from "./Navbar";
import ReactAppBar from "./ReactAppBar";

function UserLayout() {
  return (
    <div>
      {/* style={{ paddingTop: "20px" }} */}
      {/* <Navbar/> */}
      <ReactAppBar />
      <Outlet />
    </div>
  );
}
export default UserLayout;
