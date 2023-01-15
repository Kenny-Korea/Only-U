import React, { useState } from "react";
import Message from "./Message";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../../atoms";
import ChatInput from "../../Components/Inputs/ChatInput";

const Messages = ({ messages, divRef }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);

  return (
    <>
      <div
        className={`w-full h-[calc(100vh-${
          hideFooter ? "4" : "8.5"
        }rem)] flex flex-col`}
      >
        <div ref={divRef} className={`w-full bg-transparent overflow-y-scroll`}>
          {messages?.map((message, index) => {
            return <Message message={message} key={index} />;
          })}
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default Messages;
