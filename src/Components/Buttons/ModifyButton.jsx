import React, { useState } from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SettingPost from "../Settings/SettingPost";

const ModifyButton = ({ post, index }) => {
  const [show, setShow] = useState();
  console.log(show);

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
        className="w-5 h-5 rounded-md bg-textPink text-white flex justify-center items-center relative"
        onClick={handleClick}
      >
        <MoreVertRoundedIcon style={{ fontSize: "1.2rem" }} />
        {show ? <SettingPost /> : null}
      </div>
    </>
  );
};

export default ModifyButton;
