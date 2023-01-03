import React from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <>
      <div className="top-12 w-full h-[calc(100%-10.2rem)] bg-red-200 absolute overflow-scroll">
        {messages?.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </div>
    </>
  );
};

export default Messages;
