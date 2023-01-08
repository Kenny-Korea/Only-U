import React from "react";
import unnamed from "../../Images/unnamed.png";

const HomeProfile = () => {
  return (
    <>
      <div className="w-36 h-full centerItem">
        <img
          src={unnamed}
          alt="pp"
          className="object-contain w-32 h-32 rounded-full"
        />
      </div>
    </>
  );
};

export default HomeProfile;
