import { useAuth } from "../providers/AuthProvider";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AllQuotes from "./AllQuotes";
import FavouriteQuotes from "./FavouriteQuotes";
import { getAllQuotes } from "../services/quotes";

const Dashboard = () => {
  // getAllQuotes
  const [quotes, setQuotes] = useState();
  useEffect(() => {
    async function fetchQuotesData() {
      try {
        const data = await getAllQuotes();
        setQuotes(data);
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchQuotesData();
  }, []);

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
      <div>
        {thisComponent === "all" ? (
          <AllQuotes quotes={quotes} />
        ) : (
          <FavouriteQuotes quotes={quotes} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
