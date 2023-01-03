import React from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <>
      <div className="top-12 w-full h-96 bg-red-200 absolute">
        {messages?.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </div>
    </>
  );
};

export default Messages;
