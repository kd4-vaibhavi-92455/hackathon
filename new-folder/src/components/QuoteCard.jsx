import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
const QuoteCard = ({ quote }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  console.log("quote---quote%%%:  ", quote);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "2px solid #000",
        padding: "10px 20px",
        alignItems: "center",
        marginBottom: "15px",
      }}
    >
      <div>
        <div>
          <Typography>{quote?.contents}</Typography>
        </div>
        <div>
          <Typography> - {quote?.author}</Typography>
        </div>
      </div>
      <div onClick={() => setIsHeartFilled(!isHeartFilled)}>
        {quote?.isLiked ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
