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
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chat", currentUser.uid), (doc) => {
        setMessages(doc.data().chat);
      });
      console.log(messages);
      // Clean-Up 함수
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <>
      <div className={`w-screen h-[calc(100vh-10rem)] page centerPage`}>
        <ChatProfile />
        <div className="top-14 w-full h-full bg-transparent absolute">
          {messages?.map((message, index) => {
            return <Message message={message} key={index} />;
          })}
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default Chat;
