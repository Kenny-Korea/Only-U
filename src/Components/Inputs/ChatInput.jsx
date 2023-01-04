import React, { useRef } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import {
  Timestamp,
  getDoc,
  doc,
  arrayUnion,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { v4 as uuid } from "uuid";

const ChatInput = ({ setTest }) => {
  const messageInputRef = useRef();
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    const res = await getDoc(doc(db, "chat", currentUser.uid));
    const docRef = doc(db, "chat", currentUser.uid);
    const chat = {
      id: uuid(),
      message: messageInputRef.current.value,
      writer: currentUser.uid,
      date: Timestamp.now(),
    };
    const handleUpdate = async (type) => {
      try {
        await type(docRef, {
          chat: arrayUnion(chat),
        });
      } catch {
        console.log("err");
      }
    };
    if (!res.exists()) {
      handleUpdate(setDoc);
    } else {
      handleUpdate(updateDoc);
    }
    messageInputRef.current.value = "";
  };
  return (
    <>
      <div className="w-screen h-12 centerItem fixed bottom-16 bg-transparent">
        <div className="w-full h-8 mx-2 flex justify-between rounded-full">
          <div className="w-[calc(100%-4rem)] flex">
            <div className="w-8 h-full bg-white centerItem rounded-tl-full rounded-bl-full">
              <AddRoundedIcon style={{ fontSize: "1.2rem" }} />
            </div>
            <textarea
              type="text"
              cols="30"
              rows="3"
              className="w-[calc(100%-4rem)] h-8 px-2 pt-1 bg-white resize-none outline-none text-md"
              ref={messageInputRef}
              placeholder="Message"
            />
            <div className="w-8 h-full bg-white centerItem rounded-tr-full rounded-br-full">
              <input type="file" id="file" className="w-10 hidden" />
              <label htmlFor="file">
                <AttachFileRoundedIcon style={{ fontSize: "1.2rem" }} />
              </label>
            </div>
          </div>
          <button
            className="w-14 h-full bg-textPink text-white rounded-full centerItem"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
