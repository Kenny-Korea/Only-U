import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const ChatInput = () => {
  return (
    <>
      <div className="w-screen h-10 flex">
        <div className="w-10 h-full bg-white centerItem">
          <div className="w-6 h-6 bg-slate-200 rounded-md">
            <AddRoundedIcon />
          </div>
        </div>
        <textarea
          type="text"
          cols="30"
          rows="3"
          className="w-[calc(100%-6.5rem)] h-full bg-white resize-none p-2"
        />
        <button className="w-16 h-full bg-pink-200">Send</button>
      </div>
    </>
  );
};

export default ChatInput;
