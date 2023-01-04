import React, { useRef, useState } from "react";
import { useEffect } from "react";
import ChatInput from "../Components/Inputs/ChatInput";
import Message from "../Components/Message/Message";
import ChatProfile from "../Components/Profile/ChatProfile";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import Messages from "../Components/Message/Messages";

const Chat = ({ size, setTitle }) => {
  setTitle("Chat");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const divRef = useRef();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chat", currentUser.uid), (doc) => {
        setMessages(doc.data().chat);
      });
      // Clean-Up 함수
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
    // divRef.current.lastChild.scrollIntoView();
    console.log(divRef.current.lastChild);
  }, [currentUser.uid]);

  return (
    <>
      {/* background */}
      <div
        className={`w-screen h-[calc(100vh-7.5rem)] bg-green-200 flex flex-col mb-16 centerPage`}
      >
        <ChatProfile />
        <Messages messages={messages} divRef={divRef} />
        <ChatInput />
      </div>
    </>
  );
};

export default Chat;
