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
    // const q = query(collection(db, "user"), where("username", "===", "riani"));
    // console.log(q);
    // const combinedId =
    //   currentUser.uid > user.uid
    //     ? currentUser.uid + user.uid
    //     : user.uid + currentUser.uid;
    // try {
    //   const res = await getDoc(doc(db, "chat", combinedId));
    //   if (!res.exists()) {
    //     await setDoc(doc(db, "chat", combinedId), { messages: [] });
    //     // create user chats
    //     await updateDoc(doc(db, "chat", currentUser.uid), {
    //       [combinedId + ".userInfo"]: {
    //         uid: user.uid,
    //         username: user.username,
    //         photoURL: user.photoURL,
    //       },
    //       [combinedId + ".date"]: serverTimestamp(),
    //     });
    //     await updateDoc(doc(db, "chat", user.uid), {
    //       [combinedId + ".userInfo"]: {
    //         uid: currentUser.uid,
    //         username: currentUser.username,
    //         photoURL: currentUser.photoURL,
    //       },
    //       [combinedId + ".date"]: serverTimestamp(),
    //     });
    //   }
    // } catch (err) {}
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
        className="w-1/5 h-16 bg-pink-300 flex flex-col justify-center items-center text-white"
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
