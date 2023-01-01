import React, { useState } from "react";
import { useEffect } from "react";
import ChatInput from "../Components/Inputs/ChatInput";
import Message from "../Components/Message/Message";
import ChatProfile from "../Components/Profile/ChatProfile";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Chat = ({ size, setTitle }) => {
  setTitle("Chat");
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chat", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      // Clean-Up 함수
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
    console.log(chats);
  }, [currentUser.uid]);
  // console.log(Object.entries(chats));
  const testMessage = [
    ["you", "hello"],
    ["you", "how are you?"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
    ["me", "I'm fine thank you"],
  ];

  return (
    <>
      <div className={`w-screen h-[calc(100vh-10rem)] page centerPage`}>
        <ChatProfile />
        <div className="top-14 w-full h-full bg-transparent absolute">
          {/* {Object.entries(chats)?.map((chat, index) => {
            return <div key={index}>{chat}</div>;
          })} */}
          {testMessage.map((item, index) => {
            return <Message test={item} key={item + index} />;
          })}
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default Chat;
