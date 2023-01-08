import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const SettingPost = () => {
  return (
    <>
      <div className="absolute top-6 right-0 flex flex-col items-end">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
        <div className="w-20 h-10 bg-white text-black text-sm rounded-tl-sm rounded-bl-sm rounded-br-sm flex flex-col justify-around">
          <div className="flex gap-1 pl-1">
            <EditRoundedIcon style={{ fontSize: "1rem" }} />
            Edit
          </div>
          <hr />
          <div className="flex gap-1 pl-1">
            <DeleteForeverRoundedIcon style={{ fontSize: "1rem" }} />
            Remove
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPost;
