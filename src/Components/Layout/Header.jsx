import React, { useContext, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import onlyU from "../../Images/OnlyU-64.png";
import ModalSettings from "../Modal/ModalSettings";
import { AuthContext } from "../../Context/AuthContext";
import { currentPageState, hidingFooterState } from "../../atoms";

const Header = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [settings, setSettings] = useState(false);

  const onClickLogo = () => {
    console.log(currentPageState);
    console.log(hidingFooterState);
  };

  const onClickSettings = () => {
    setSettings(!settings);
  };

  return (
    <>
      <div
        className="w-screen h-14 bg-white text-brightRed font-bold text-2xl
        flex justify-between items-center px-5 relative shadow-sm overflow-x-clip"
      >
        <div className="w-[50rem] h-[50rem] -top-[40rem] left-[calc(100vw/2-25rem)] rounded-full bg-gradient-to-br from-white via-mainColor to-yellow-200 absolute"></div>
        {/* <img
          src={onlyU}
          alt="pp"
          className="w-10 h-10 z-10"
          onClick={onClickLogo}
        /> */}
        <div className="z-10">{children}</div>
        {/* <div className="z-10 text-white font-extrabold text-2xl">Home</div> */}

        <MenuRoundedIcon
          onClick={onClickSettings}
          style={{ zIndex: 1, color: "white", fontSize: "2rem" }}
        />
        <ModalSettings settings={settings} setSettings={setSettings} />
      </div>
    </>
  );
};

export default Header;
