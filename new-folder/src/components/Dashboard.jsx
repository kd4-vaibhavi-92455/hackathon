import { useAuth } from "../providers/AuthProvider";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import AllQuotes from "./AllQuotes";
import FavouriteQuotes from "./FavouriteQuotes";

const Dashboard = () => {
  const navigate = useNavigate();
  const [thisComponent, setThisComponent] = useState("all");
  return (
    <div style={{ padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Quotes Around the world
      </h2>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div>
          <Button
            onClick={() => setThisComponent("fav")}
            color="#000"
            size="small"
          >
            Favourites
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setThisComponent("all")}
            color="#000"
            size="small"
          >
            All
          </Button>
        </div>
      </div>
      <div>{thisComponent === "all" ? <AllQuotes /> : <FavouriteQuotes />}</div>
    </div>
  );
};

export default Dashboard;
