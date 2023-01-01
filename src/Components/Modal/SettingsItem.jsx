import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const SettingsItem = ({ text, setSettings }) => {
  const { currentUser } = useContext(AuthContext);
  const handleClick = () => {
    setSettings(false);
    switch (text) {
      case "Logout":
        signOut(auth);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div
        className="w-full h-12 p-4 bg-pink-700 font-bold text-xl text-white border border-b-white flex items-center"
        onClick={handleClick}
      >
        {text}
      </div>
    </>
  );
};

export default SettingsItem;
