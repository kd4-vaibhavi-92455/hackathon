import React from "react";
import QuoteCard from "./QuoteCard";
import Grid from "@mui/material/Grid";

const FavouriteQuotes = ({ quotes }) => {
  const favouriteQuotes = quotes?.filter((quote) => quote.isLiked === true);
  return (
    <div>
      <div>
        {favouriteQuotes?.map((data) => (
          <QuoteCard key={data.id} quote={data} />
        ))}

        {favouriteQuotes?.length === 0 && (
          <p>You have no favorite quotes yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavouriteQuotes;
