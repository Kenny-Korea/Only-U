import React from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const ModifyButton = () => {
  return (
    <>
      <div className="w-5 h-5 rounded-md bg-textPink text-white flex justify-center items-center">
        <MoreVertRoundedIcon style={{ fontSize: "1.2rem" }} />
      </div>
    </>
  );
};

export default ModifyButton;
