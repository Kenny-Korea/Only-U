import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

const SettingsItem = ({ text, setSettings }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setSettings(false);
    switch (text) {
      case "Partner":
        navigate("/Partner");
        break;
      case "Settings":
        navigate("/Settings");
        break;
      case "Logout":
        signOut(auth);
        break;
      default:
        break;
    }
  };
  const Icon = () => {
    switch (text) {
      case "Partner":
        return (
          <GroupRoundedIcon style={{ fontSize: "1.5rem", color: "white" }} />
        );
      case "Settings":
        return (
          <SettingsRoundedIcon style={{ fontSize: "1.5rem", color: "white" }} />
        );
      case "Logout":
        return (
          <LogoutRoundedIcon style={{ fontSize: "1.5rem", color: "white" }} />
        );
      default:
        return;
    }
  };
  return (
    <>
      <div
        className="flex flex-col gap-[0.1rem] items-center font-medium m-1 rounded-md"
        onClick={handleClick}
      >
        <div className="w-[2rem] h-[2rem] rounded-xl shadow-md bg-main overflow-hidden centerItem">
          {Icon()}
        </div>
        <span className="text-xs font-bold">{text}</span>
      </div>
    </>
  );
};

export default SettingsItem;
