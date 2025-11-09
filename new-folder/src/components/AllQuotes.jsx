import React from "react";
import QuoteCard from "./QuoteCard";

const AllQuotes = ({ quotes }) => {
  return (
    <div>
      {quotes?.map((data, index) => (
        <QuoteCard key={data.id} quote={data} />
      ))}
    </div>
  );
};

export default AllQuotes;
