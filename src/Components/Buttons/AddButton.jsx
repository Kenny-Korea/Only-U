import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import ModalPost from "../Modal/ModalPost";

const AddButton = ({ page, addPost, setAddPost, addPlace, setAddPlace }) => {
  const [hideButton, setHideButton] = useState(false);
  const handleClick = () => {
    switch (page) {
      case "home":
        break;
      case "post":
        setAddPost(!addPost);
        break;
      case "place":
        setAddPlace(!addPlace);
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div
        className={
          hideButton
            ? "hidden"
            : "w-12 h-12 fixed bottom-24 right-6 bg-pink-300 shadow-md text-white text-4xl flex justify-center items-center rounded-full z-50 hover:font-bold hover:text-5xl hover:bg-pink-400"
        }
        onClick={handleClick}
      >
        <AddRoundedIcon style={{ fontSize: "2rem" }} />
      </div>
    </>
  );
};

export default AddButton;
