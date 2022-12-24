import React from "react";
import { useNavigate } from "react-router-dom";

const MenuButton = ({ children }) => {
  const navigate = useNavigate();

  // 하단 탭 클릭하면 페이지 이동하는 함수
  const handleClick = (tabName) => {
    if (tabName === "Home") {
      navigate("/");
    } else navigate(`/${children}`);
  };
  return (
    <>
      <div
        className="w-1/5 h-20 bg-pink-300 flex justify-center items-center text-white"
        onClick={(e) => handleClick(e.target.textContent)}
      >
        {children}
      </div>
    </>
  );
};

export default MenuButton;
