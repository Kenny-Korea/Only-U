import React from "react";
import MenuButton from "../Buttons/MenuButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";

const Footer = () => {
  const iconSize = { fontSize: "1.8rem", color: "white" };
  return (
    <>
      <div className="TabBottom w-screen h-16 flex flex-row border-white fixed bottom-0">
        {/* key를 넣어줘야 에러가 발생하지 않는데 왜 그러는지 확인 필요 */}
        <MenuButton
          children={[<HomeRoundedIcon style={iconSize} key="Home" />, "Home"]}
        />
        <MenuButton
          children={[<PhotoRoundedIcon style={iconSize} key="Post" />, "Post"]}
        />
        <MenuButton
          children={[
            <ChatBubbleOutlineRoundedIcon style={iconSize} key="Chat" />,
            "Chat",
          ]}
        />
        <MenuButton
          children={[
            <PlaceRoundedIcon style={iconSize} key="Place" />,
            "Place",
          ]}
        />
        <MenuButton
          children={[
            <CardGiftcardRoundedIcon style={iconSize} key="Gift" />,
            "Gift",
          ]}
        />
      </div>
    </>
  );
};

export default Footer;
