import React, { useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SettingPost from "../Settings/SettingPost";

const ModifyButton = ({ post, index }) => {
  const [show, setShow] = useState();

  const handleClick = (e) => {
    if (show === e.currentTarget.id) {
      setShow(null);
      return;
    }
    setShow(e.currentTarget.id);
  };
  return (
    <>
      <div
        id={index}
        className="w-5 h-5 rounded-md bg-gray-300 text-black flex justify-center items-center relative"
        onClick={handleClick}
      >
        <MoreHorizRoundedIcon style={{ fontSize: "1.1rem" }} />
        {show ? <SettingPost /> : null}
      </div>
    </>
  );
};

export default ModifyButton;
