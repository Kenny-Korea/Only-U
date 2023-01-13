import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const messageWrapper = "h-auto p-2 flex";
  const messageItem = "p-2 style={{width: 10px}} text-xs";

  return (
    <>
      <div
        className={
          message.writer === currentUser
            ? `${messageWrapper}`
            : `${messageWrapper} justify-end`
        }
      >
        <div className="text-xs text-gray-400 flex justify-end items-end mr-1">
          {message.date.toDate().getHours()}:
          {message.date.toDate().getMinutes()}
        </div>
        <p
          style={{ maxWidth: "70%" }}
          className={
            message.writer === currentUser
              ? `${messageItem} bg-gray-200 rounded-tr-xl rounded-bl-xl rounded-br-xl`
              : `${messageItem} bg-blue-100 rounded-tl-xl rounded-bl-xl rounded-br-xl`
          }
        >
          {message.message}
        </p>
      </div>
    </>
  );
};

export default Message;
