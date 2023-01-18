import React, { useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const ModifyButton = ({ post, index }) => {
  const [clicked, setClicked] = useState(false);
  const onClickSettings = () => {
    setClicked(!clicked);
  };
  const onClickEdit = () => {};
  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      console.log("삭제");
    } else {
      console.log("취소");
    }
  };
  const frame = (event, icon) => (
    <div
      className="bg-white w-5 h-5 shadow-inner shadow-gray-200 text-black rounded-full centerItem"
      onClick={event}
    >
      {icon}
    </div>
  );
  const settingsButton = frame(
    onClickSettings,
    <MoreHorizRoundedIcon style={{ fontSize: "1.1rem" }} />
  );
  const editButton = frame(
    onClickEdit,
    <EditRoundedIcon style={{ fontSize: "1.1rem" }} />
  );
  const deleteButton = frame(
    onClickDelete,
    <DeleteRoundedIcon style={{ fontSize: "1.1rem" }} />
  );

  const content = () => {
    if (!clicked) return [settingsButton, editButton, deleteButton];
    return [editButton, deleteButton, settingsButton];
  };

  return (
    <>
      <div className="relative w-6 h-6 bg-transparent">
        <div
          className={`${
            clicked
              ? "w-24 shadow-test bg-white"
              : "w-[1.59rem] shadow-sm bg-bgColor"
          } absolute top-0 right-0 h-[1.59rem] px-[0.17rem]  flex rounded-full duration-300 overflow-hidden`}
        >
          <div className="w-24 flex justify-between gap-1 items-center">
            {content().map((map) => map)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyButton;
