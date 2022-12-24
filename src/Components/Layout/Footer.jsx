import React from "react";
import MenuButton from "../Buttons/MenuButton";

const Footer = () => {
  return (
    <>
      <div className="TabBottom w-screen h-20 flex flex-row border-white fixed bottom-0">
        <MenuButton children="Home" />
        <MenuButton children="Post" />
        <MenuButton children="Chat" />
        <MenuButton children="Plan" />
        <MenuButton children="Shop" />
      </div>
    </>
  );
};

export default Footer;
