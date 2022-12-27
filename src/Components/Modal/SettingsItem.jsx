import React from "react";

const SettingsItem = ({ text }) => {
  return (
    <>
      <div className="w-full h-12 p-4 bg-pink-700 font-bold text-xl text-white border border-b-white flex items-center">
        {text}
      </div>
    </>
  );
};

export default SettingsItem;
