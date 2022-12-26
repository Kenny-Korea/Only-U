import React from "react";
import unnamed from "../../Images/unnamed.png";

const ProfileSmall = () => {
  return (
    <>
      <div className="flex items-center gap-1">
        <img src={unnamed} alt="pp" className="w-6 h-6 rounded-full" />
        <span className="text-lg">Kenny Kim</span>
      </div>
    </>
  );
};

export default ProfileSmall;
