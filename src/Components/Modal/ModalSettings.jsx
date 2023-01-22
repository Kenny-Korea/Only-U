import React from "react";
import "../../App.css";
import SettingsItem from "./SettingsItem";

const ModalSettings = ({ settings, setSettings }) => {
  return (
    <>
      {/* {settings && <div id="outside"></div>} */}
      <div
        className="absolute z-30 shadow-md bg-white h-40 rounded-xl flex flex-col items-center duration-500 top-[4rem] w-[3rem] gap-2 pt-1"
        id={settings ? "settingSlideIn" : "settingSlideOut"}
      >
        <SettingsItem text="Partner" setSettings={setSettings} />
        <SettingsItem text="Settings" setSettings={setSettings} />
        <SettingsItem text="Logout" setSettings={setSettings} />
      </div>
    </>
  );
};

export default ModalSettings;
