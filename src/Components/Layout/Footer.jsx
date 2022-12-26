import React from "react";
import MenuButton from "../Buttons/MenuButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";

const Footer = () => {
  const iconSize = { fontSize: "2rem", color: "white" };
  return (
    <>
      <div className="TabBottom w-screen h-20 flex flex-row border-white fixed bottom-0">
        <MenuButton children={[<HomeRoundedIcon style={iconSize} />, "Home"]} />
        <MenuButton
          children={[<PhotoRoundedIcon style={iconSize} />, "Post"]}
        />
        <MenuButton
          children={[<ChatBubbleOutlineRoundedIcon style={iconSize} />, "Chat"]}
        />
        <MenuButton
          children={[<PlaceRoundedIcon style={iconSize} />, "Place"]}
        />
        <MenuButton
          children={[<CardGiftcardRoundedIcon style={iconSize} />, "Gift"]}
        />
      </div>
    </>
  );
};

export default Footer;
