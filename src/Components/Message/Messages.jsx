import React from "react";
import Message from "./Message";

const Messages = ({ messages, divRef }) => {
  console.log(messages.length);
  return (
    <>
      <div
        ref={divRef}
        className="w-full h-[calc(100vh-13rem)] pb-12 bg-transparent overflow-y-scroll"
      >
        {messages?.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </div>
    </>
  );
};

export default Messages;
