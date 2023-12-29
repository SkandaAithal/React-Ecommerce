import React from "react";

function FormatPrice({ price, number }) {
  return (
    <>
      {Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(price / number)}
    </>
  );
}

export default FormatPrice;
