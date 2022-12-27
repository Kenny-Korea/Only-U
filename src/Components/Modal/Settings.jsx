import React, { useRef, useState } from "react";
import "../../App.css";
import SettingsItem from "./SettingsItem";

const Settings = ({ settings }) => {
  return (
    <>
      {settings && <div id="outside"></div>}
      <div id={settings ? "slideIn" : "slideOut"}>
        <SettingsItem text="Logout" />
        <SettingsItem text="MyPage" />
        <SettingsItem text="Molla" />
        <SettingsItem text="Test" />
        <SettingsItem text="Test2" />
      </div>
    </>
  );
};

export default Settings;
