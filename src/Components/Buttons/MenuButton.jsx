import React from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, query, collection, where } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useState } from "react";
import { ChatContext } from "../../Context/ChatContext";

const MenuButton = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // const { lover } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState("sisca");

  const handleLoadChat = async () => {
    navigate("/Chat");
  };

  // target을 사용하면 하위 요소인 span태그를 클릭 시, 해당 이벤트가 선택됨
  // currentTarget은 이벤트 핸들러를 갖고 있는 태그를 가리키므로, currentTarget을 사용해야 이벤트 캡쳐링으로 인한 오류를 막을 수 있음
  const handleClick = (e) => {
    switch (e.currentTarget.id) {
      case "Home":
        navigate("/");
        break;
      case "Chat":
        handleLoadChat();
        break;
      default:
        navigate(`/${children[1]}`);
        break;
    }
  };

  return (
    <>
      <div
        className="w-1/5 h-16 bg-slate-50 flex flex-col justify-center items-center text-gray-400 border-t-2 border-gray-300"
        id={children[1]}
        onClick={handleClick}
      >
        <span className="mb-0.5">{children[0]}</span>
        <span className="text-xs font-bold">{children[1]}</span>
      </div>
    </>
  );
};

export default MenuButton;
