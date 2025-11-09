import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const QuoteCard = () => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "2px solid #000",
        padding: "10px 20px",
      }}
    >
      <div>text</div>
      <div onClick={() => setIsHeartFilled(!isHeartFilled)}>
        {isHeartFilled ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
