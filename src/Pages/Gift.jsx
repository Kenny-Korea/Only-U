import React from "react";
import hearts from "../Images/Hearts.png";

const Gift = ({ size, setTitle }) => {
  setTitle("Gift");

  return (
    <>
      <div className={`${size} page`}>
        <div
          className="w-40 h-40 absolute"
          style={{
            backgroundImage: `url(${hearts})`,
            backgroundSize: "contain",
          }}
        >
          <div
            className="w-14 h-8 font-bold text-2xl  top-14 transform rotate-12 relative text-white flex justify-center items-center"
            style={{ left: "4.6rem" }}
          >
            1024
          </div>
          <div
            className="w-14 h-8 font-bold text-xs  transform -rotate-12 relative text-white flex justify-center items-center"
            style={{ top: "3.5rem", left: "1.5rem" }}
          >
            Days Together
          </div>
        </div>
      </div>
    </>
  );
};

export default Gift;
