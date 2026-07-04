import React from "react";

const DateClient = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {year}-{(year + 1) % 100}
    </>
  );
};

export default DateClient;
