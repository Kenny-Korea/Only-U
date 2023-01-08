import React, { useContext, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import onlyU from "../../Images/OnlyU-64.png";
import ModalSettings from "../Modal/ModalSettings";
import { AuthContext } from "../../Context/AuthContext";

const Header = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [settings, setSettings] = useState(false);

  const onClickLogo = () => {
    console.log(currentUser);
  };

  const onClickSettings = () => {
    setSettings(!settings);
  };

  return (
    <>
      <div
        className="w-screen h-14 bg-white text-brightRed font-bold text-2xl
        flex justify-between items-center px-3 relative shadow-sm"
      >
        <img src={onlyU} alt="pp" className="w-10 h-10" onClick={onClickLogo} />
        {children}
        {/* 
        {currentUser?.photoURL ? (
          <img
            className="w-10 h-10 rounded object-cover"
            onClick={onClickSettings}
            src={currentUser.photoURL}
            alt="pp"
          />
        ) : ( */}
        <MenuRoundedIcon onClick={onClickSettings} />
        {/* )} */}

        <ModalSettings settings={settings} setSettings={setSettings} />
      </div>
    </>
  );
};

export default Header;
