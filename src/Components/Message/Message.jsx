import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const messageWrapper = "h-auto p-2 flex gap-1 mx-2";
  const messageItem = "p-2 text-xs";

  return (
    <>
      <div
        className={
          message.writer === currentUser.uid
            ? `${messageWrapper} justify-end`
            : `${messageWrapper} justify-end flex-row-reverse`
        }
      >
        <div className="text-xs text-gray-400 flex justify-end items-end mr-1">
          {message.date.toDate().getHours()}:
          {message.date.toDate().getMinutes()}
        </div>
        <p
          style={{ maxWidth: "70%" }}
          className={
            message.writer === currentUser.uid
              ? `${messageItem} bg-blue-200 rounded-tl-xl rounded-bl-xl rounded-br-xl`
              : `${messageItem} bg-gray-200 rounded-tr-xl rounded-bl-xl rounded-br-xl`
          }
        >
          {message.message}
        </p>
      </div>
    </>
  );
};

export default Message;
