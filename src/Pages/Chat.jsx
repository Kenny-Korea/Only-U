import React from "react";
import ChatInput from "../Components/Inputs/ChatInput";
import Message from "../Components/Message/Message";
import ProfileLarge from "../Components/Profile/ProfileLarge";
import ProfileSmall from "../Components/Profile/ProfileSmall";

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
        <ProfileLarge />
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
