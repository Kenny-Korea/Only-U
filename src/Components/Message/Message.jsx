import React from "react";

const Message = ({ test }) => {
  const messageWrapper = "w-full h-14 p-2 flex";
  const messageItem = "w-1/2 p-2";
  return (
    <>
      <div
        className={
          test[0] === "you"
            ? `${messageWrapper}`
            : `${messageWrapper} justify-end`
        }
      >
        <p
          className={
            test[0] === "you"
              ? `${messageItem} bg-pink-300 rounded-tr-xl rounded-bl-xl rounded-br-xl`
              : `${messageItem} bg-slate-300 rounded-tl-xl rounded-bl-xl rounded-br-xl`
          }
        >
          {test[1]}
        </p>
      </div>
    </>
  );
};

export default Message;
