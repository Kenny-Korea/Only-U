import React, { useRef } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { v5 as uuid } from "uuid";

const ChatInput = () => {
  const messageInputRef = useRef();
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    if (messageInputRef.current.value === "") return;
    const colRef = collection(db, "chat");
    try {
      await addDoc(colRef, {
        id: uuid,
        message: messageInputRef.current.value,
        senderId: currentUser.uid,
        date: serverTimestamp(),
      });
    } catch {}
    messageInputRef.current.value = "";
  };
  return (
    <>
      <div className="w-screen h-10 flex fixed bottom-16">
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
          ref={messageInputRef}
        />
        <button className="w-16 h-full bg-pink-200" onClick={handleSend}>
          Send
        </button>
      </div>
    </>
  );
};

export default ChatInput;
