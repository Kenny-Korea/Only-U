import React, { useRef, useState } from "react";
import "../../App.css";
import SettingsItem from "./SettingsItem";

const ModalSettings = ({ settings, setSettings }) => {
  return (
    <>
      {settings && <div id="outside"></div>}
      <div
        className="absolute z-20"
        id={settings ? "settingSlideIn" : "settingSlideOut"}
      >
        <SettingsItem text="Logout" setSettings={setSettings} />
        <SettingsItem text="MyPage" setSettings={setSettings} />
        <SettingsItem text="Molla" setSettings={setSettings} />
        <SettingsItem text="Test" setSettings={setSettings} />
        <SettingsItem text="Test2" setSettings={setSettings} />
      </div>
    </>
  );
};

export default ModalSettings;
