import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import onlyU from "../../Images/OnlyU-64.png";

const Header = ({ children }) => {
  return (
    <>
      <div className="w-screen h-20 bg-white text-brightRed font-bold text-2xl flex justify-between items-center px-3 fixed top-0 z-10">
        {/* <div className="flex items-center font-extrabold"> */}
        <img src={onlyU} alt="pp" className="w-12 h-12" />
        {children}
        {/* </div> */}
        <MenuRoundedIcon style={{ fontSize: "2rem" }} />
      </div>
    </>
  );
};

export default Header;
