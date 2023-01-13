import React from "react";
import unnamed from "../../Images/unnamed.png";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const ChatProfile = () => {
  return (
    <>
      <div className="w-full h-12 mt-1 px-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <img src={unnamed} alt="pp" className="w-7 h-7 rounded-full" />
          <span className="text-2xl text-white font-extrabold">Kenny Kim</span>
        </div>
        <MoreVertRoundedIcon style={{ fontSize: "1.5rem" }} />
      </div>
    </>
  );
};

export default ChatProfile;
