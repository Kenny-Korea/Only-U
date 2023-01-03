import React from "react";
import unnamed from "../../Images/unnamed.png";

const ChatProfile = () => {
  return (
    <>
      <div className="w-full h-10 mt-1 pl-2 flex items-center gap-3 bg-slate-200 rounded-full">
        <img src={unnamed} alt="pp" className="w-7 h-7 rounded-full" />
        <span className="text-lg">Kenny Kim</span>
      </div>
    </>
  );
};

export default ChatProfile;
