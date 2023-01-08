import React from "react";
import unnamed from "../../Images/unnamed.png";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const ChatProfile = () => {
  return (
    <>
      <div className="w-full h-10 mt-1 px-2 flex justify-between items-center shadow-test">
        <div className="flex items-center gap-3">
          <img src={unnamed} alt="pp" className="w-7 h-7 rounded-full" />
          <span className="text-lg">Kenny Kim</span>
        </div>
        <MoreVertRoundedIcon style={{ fontSize: "1.3rem" }} />
      </div>
    </>
  );
};

export default ChatProfile;
