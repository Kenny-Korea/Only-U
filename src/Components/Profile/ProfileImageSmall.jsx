import React from "react";
import unnamed from "../../Images/unnamed.png";

const ProfileImageSmall = () => {
  return (
    <>
      <div className="w-8 h-8 centerItem gap-1 rounded-full border-1 border-gray-200">
        <img
          src={unnamed}
          alt="pp"
          className="w-6 h-6 rounded-full shadow-md"
        />
        {/* <span className="text-lg">Kenny Kim</span> */}
      </div>
    </>
  );
};

export default ProfileImageSmall;
