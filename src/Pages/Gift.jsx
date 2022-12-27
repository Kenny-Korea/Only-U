import React from "react";
import hearts from "../Images/Hearts.png";

const Gift = ({ size, setTitle }) => {
  setTitle("Gift");

  return (
    <>
      <div className={`${size} page`}>Gift Page</div>
    </>
  );
};

export default Gift;
