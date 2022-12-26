import React from "react";
import unnamed from "../../Images/unnamed.png";

const ProfileLarge = () => {
  return (
    <>
      <div className="w-full h-14 pl-4 flex items-center gap-3 bg-slate-200">
        <img src={unnamed} alt="pp" className="w-10 h-10 rounded-full" />
        <span className="text-2xl">Kenny Kim</span>
      </div>
    </>
  );
};

export default ProfileLarge;
