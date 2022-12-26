import React from "react";
import unnamed from "../../Images/toongtoong.png";

const PlaceCard = () => {
  return (
    <>
      <div
        className="w-32 h-32 bg-black opacity-50"
        style={{ background: `url(${unnamed})` }}
      >
        test
        {/* <img src={unnamed} alt="" /> */}
      </div>
    </>
  );
};

export default PlaceCard;
