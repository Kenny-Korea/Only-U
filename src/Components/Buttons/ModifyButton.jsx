import React, { useContext, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

import { db } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";

const ModifyButton = ({ item, docName }) => {
  const [clicked, setClicked] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const onClickSettings = () => {
    setClicked(!clicked);
  };
  const onClickEdit = () => {};
  const onClickDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const docRef = doc(db, docName, currentUser.uid);
      const fieldName = docName.substring(0, docName.length - 1);
      await updateDoc(docRef, {
        [fieldName]: arrayRemove(item),
      });
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
    <MoreHorizRoundedIcon style={{ fontSize: "1.1rem" }} key={item.id} />
  );
  const editButton = frame(
    onClickEdit,
    <EditRoundedIcon style={{ fontSize: "1.1rem" }} key={item.id} />
  );
  const deleteButton = frame(
    onClickDelete,
    <DeleteRoundedIcon style={{ fontSize: "1.1rem" }} key={item.id} />
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
