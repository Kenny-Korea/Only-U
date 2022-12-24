import React from "react";

const Header = ({ children }) => {
  return (
    <>
      <div className="w-screen h-20 bg-pink-200 text-black font-bold text-2xl flex justify-between items-center pl-5 fixed top-0 z-10">
        {children}
        <div>햄버거</div>
      </div>
    </>
  );
};

export default Header;
