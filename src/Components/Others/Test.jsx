import React, { useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const Test = ({ size }) => {
  const [clicked, setClicked] = useState(false);
  const onClickSettings = () => {
    setClicked(!clicked);
  };
  const onClickEdit = () => {};
  const onClickDelete = () => {
    alert("정말 삭제하시겠습니까?");
  };
  return (
    <>
      <div className={`${size} overflow-y-scroll flex justify-center z-10`}>
        <div className="w-10/12 flex flex-col items-center relative">
          <div className="relative w-6 h-6 bg-transparent">
            <div
              className={`${
                clicked ? "w-24" : "w-6"
              } absolute top-0 right-0 h-6 flex bg-white rounded-full duration-300 overflow-hidden border-spacing-1`}
            >
              <div className="w-24 flex justify-between items-center">
                <div
                  className="bg-gray-200 text-black rounded-full"
                  onClick={onClickSettings}
                >
                  <MoreHorizRoundedIcon />
                </div>
                <div onClick={onClickEdit}>
                  <EditRoundedIcon />
                </div>
                <div onClick={onClickDelete}>
                  <DeleteRoundedIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
