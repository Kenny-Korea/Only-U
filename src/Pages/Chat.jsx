import React from "react";
import ChatInput from "../Components/Inputs/ChatInput";
import Message from "../Components/Message/Message";
import ChatProfile from "../Components/Profile/ChatProfile";

const Chat = ({ size, setTitle }) => {
  setTitle("Chat");

  const testMessage = [
    ["you", "hello"],
    ["you", "how are you?"],
    ["me", "I'm fine thank you"],
  ];

  return (
    <>
      <div className={`${size} page centerPage`}>
        <ChatProfile />
        <div className="w-full h-[calc(100%-17rem)]">
          {testMessage.map((item) => {
            return <Message test={item} />;
          })}
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default Chat;
