import React from "react";
import hearts from "../../Images/Hearts.png";

const BeenTogether = () => {
  return (
    <>
      <div>
        <div
          className="w-32 h-32 bg-white"
          style={{
            backgroundImage: `url(${hearts})`,
            backgroundSize: "contain",
          }}
        >
          <div
            className="w-14 h-8 font-bold text-2xl transform rotate-12 relative text-white flex justify-center items-center"
            style={{ top: "2.5rem", left: "3.3rem" }}
          >
            1024
          </div>
          <div
            className="w-14 h-8 font-bold text-xs transform -rotate-12 relative text-white flex justify-center items-center"
            style={{ top: "2rem", left: "0.8rem" }}
          >
            Days Together
          </div>
        </div>
      </div>
    </>
  );
};

export default BeenTogether;
