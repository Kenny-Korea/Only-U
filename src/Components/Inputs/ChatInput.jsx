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
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../../atoms";
import { PartnerContext } from "../../Context/PartnerContext";

const ChatInput = () => {
  const messageInputRef = useRef();
  const { currentUser, partnerInfo } = useContext(AuthContext);

  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);

  const handleFooter = (e) => {
    // setHideFooter(!hideFooter);
    setHideFooter(!hideFooter);
  };

  const handleSend = async () => {
    if (messageInputRef.current.value === "") return;
    const res = await getDoc(doc(db, "chat", partnerInfo.combinedId));
    const docRef = doc(db, "chat", partnerInfo.combinedId);
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
      <div className={`w-screen min-h-[3.5rem] h-14 centerItem`}>
        <div className="w-full h-8 mx-2 flex justify-between rounded-full">
          <div className="w-[calc(100%-4rem)] flex">
            <div className="w-8 h-full bg-white centerItem rounded-tl-full rounded-bl-full">
              <div className="w-6 h-6 bg-main rounded-full centerItem">
                <AddRoundedIcon
                  style={{ fontSize: "1.2rem", color: "white" }}
                />
              </div>
            </div>
            <textarea
              type="text"
              cols="30"
              rows="3"
              className="w-[calc(100%-4rem)] h-8 px-2 pt-1 bg-white resize-none outline-none text-md"
              ref={messageInputRef}
              placeholder="Message"
              onFocus={handleFooter}
              onBlur={handleFooter}
            />
            <div className="w-8 h-full bg-white centerItem rounded-tr-full rounded-br-full">
              <input type="file" id="file" className="w-10 hidden" />
              <label htmlFor="file">
                <AttachFileRoundedIcon style={{ fontSize: "1.2rem" }} />
              </label>
            </div>
          </div>
          <button
            className="w-14 h-full bg-main text-white rounded-full centerItem"
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
