import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";

const AddButton = ({ page }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    switch (page) {
      case "home":
        console.log("home");
        break;
      case "post":
        console.log("post");
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div
        className="w-12 h-12 fixed bottom-24 right-6 bg-pink-300 shadow-md
       text-white text-4xl flex justify-center items-center rounded-full
       hover:font-bold hover:text-5xl hover:bg-pink-400"
        onClick={handleClick}
      >
        <AddRoundedIcon style={{ fontSize: "2rem" }} />
      </div>
    </>
  );
};

export default AddButton;
