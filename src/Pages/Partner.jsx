import React, { useContext, useEffect, useRef, useState } from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { AuthContext } from "../Context/AuthContext";
import {
  doc,
  updateDoc,
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import ModifyButton from "../Components/Buttons/ModifyButton";
import SubmitCancelButton from "../Components/Buttons/SubmitCancelButton";
import { useNavigate } from "react-router-dom";

const Partner = ({ size }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [randomNum, setRandomNum] = useState(null);
  const [copiedAlarm, setCopiedAlarm] = useState(false);

  const numRef = useRef();
  const inputRef = useRef();
  const handleCopy = () => {
    window.navigator.clipboard
      .writeText(numRef.current.textContent)
      .then(() => {
        setCopiedAlarm(true);
      });
  };
  useEffect(() => {
    if (!currentUser.uid) return;
    const generatedNum = Math.floor(Math.random() * 1000000);
    setRandomNum(generatedNum);
    console.log(currentUser.uid);
    const userRef = doc(db, "user", currentUser.uid);
    updateDoc(userRef, { regNum: generatedNum });
  }, [currentUser]);

  const handleSubmit = async () => {
    const colRef = collection(db, "user");
    // console.log(inputRef.current.value);
    const q = query(
      colRef,
      where("regNum", "==", parseInt(inputRef.current.value))
    );
    const querySnapshot = await getDocs(q);
    let partnerId;
    querySnapshot.forEach((doc) => {
      partnerId = doc.data().uid;
    });
    if (partnerId) {
      console.log("partnerId exists");
      const userRef = doc(db, "user", currentUser.uid);
      const partnerRef = doc(db, "user", partnerId);
      console.log(currentUser.uid);
      console.log(partnerId);
      await updateDoc(userRef, { combinedId: currentUser.uid + partnerId });
      await updateDoc(partnerRef, { combinedId: currentUser.uid + partnerId });
    }
  };
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <>
      <div
        className={`${size} pb-4 overflow-y-scroll flex justify-center z-10`}
      >
        <div className="w-10/12">
          <div className="w-full rounded-xl shadow-md bg-white">
            <div className="w-full mt-3 flex flex-col gap-1 items-center">
              <div
                className="w-[calc(100%-1rem)] h-14 mt-2 rounded-md border-4 border-main text-center leading-[3rem] text-main font-bold text-2xl tracking-[0.5rem] relative"
                ref={numRef}
              >
                {randomNum && randomNum}
                <div
                  className="absolute top-0 right-2 text-main"
                  onClick={handleCopy}
                >
                  <ContentCopyRoundedIcon />
                </div>
              </div>
              <div className="text-xs text-center text-textBlack font-bold">
                Share this reg number to your partner or Enter your partner's
                reg number down below
              </div>
              <input type="text" className="loginInput" ref={inputRef} />
              <div className="w-full">
                <SubmitCancelButton
                  handleSubmit={handleSubmit}
                  handleCancel={handleCancel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;
