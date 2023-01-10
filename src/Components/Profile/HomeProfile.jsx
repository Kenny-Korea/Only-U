import React from "react";
import unnamed from "../../Images/unnamed.png";

const HomeProfile = ({ photo }) => {
  return (
    <>
      <div className="w-36 h-full centerItem">
        <img
          src={photo ? photo : unnamed}
          alt="pp"
          className="object-cover w-28 h-28 rounded-full"
        />
      </div>
    </>
  );
};

export default HomeProfile;
