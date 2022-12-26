import React from "react";
import MenuButton from "../Buttons/MenuButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

const Footer = () => {
  const iconSize = { fontSize: "2rem" };
  return (
    <>
      <div className="TabBottom w-screen h-20 flex flex-row border-white fixed bottom-0">
        <MenuButton
          children={[<HomeOutlinedIcon style={iconSize} />, "Home"]}
        />
        <MenuButton
          children={[<PhotoOutlinedIcon style={iconSize} />, "Post"]}
        />
        <MenuButton
          children={[
            <ChatBubbleOutlineOutlinedIcon style={iconSize} />,
            "Chat",
          ]}
        />
        <MenuButton
          children={[<EventAvailableOutlinedIcon style={iconSize} />, "Plan"]}
        />
        <MenuButton
          children={[<CardGiftcardOutlinedIcon style={iconSize} />, "Gift"]}
        />
      </div>
    </>
  );
};

export default Footer;
