import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import onlyU from "../../Images/OnlyU-64.png";
import Settings from "../Modal/Settings";

const Header = ({ children }) => {
  const [settings, setSettings] = useState(false);

  const onClickSettings = () => {
    setSettings(!settings);
  };

  return (
    <>
      <div
        className="w-screen h-16 bg-slate-400 text-brightRed font-bold text-2xl 
        flex justify-between items-center px-3 fixed top-0 z-10"
      >
        {/* <div className="flex items-center font-extrabold"> */}
        <img src={onlyU} alt="pp" className="w-12 h-12" />
        {children}
        {/* </div> */}
        <MenuRoundedIcon
          style={{ fontSize: "2rem" }}
          onClick={onClickSettings}
        />
        <Settings settings={settings} setSettings={setSettings} />
      </div>
    </>
  );
};

export default Header;
