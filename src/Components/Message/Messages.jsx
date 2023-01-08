import React from "react";
import Message from "./Message";

const Messages = ({ messages, divRef }) => {
  console.log(messages.length);
  return (
    <>
      <div
        ref={divRef}
        className="top-12 w-full h-[calc(100%-10.2rem)] bg-red-200 absolute overflow-y-auto"
      >
        {messages?.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </div>
    </>
  );
};

export default Messages;
