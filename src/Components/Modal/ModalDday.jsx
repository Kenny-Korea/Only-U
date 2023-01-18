import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../../atoms";
import SubmitCancelButton from "../Buttons/SubmitCancelButton";
import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { v4 as uuid } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "react-datepicker/src/stylesheets/datepicker-cssmodules.scss";

const ModalDday = ({ addDday, setAddDday }) => {
  const { currentUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  const [startDate, setStartDate] = useState(new Date());
  const titleRef = useRef();

  const handleFooter = (e) => {
    setHideFooter(!hideFooter);
  };

  const handleCancel = () => {
    setAddDday(false);
  };

  const handleSubmit = async () => {
    if (uploading) return;
    setUploading(true);
    const uploadDate = Timestamp.now();
    const res = await getDoc(doc(db, "Ddays", currentUser.uid));
    const docRef = doc(db, "Ddays", currentUser.uid);
    const urlArray = [];

    const data = {
      id: uuid(),
      title: titleRef.current.value,
      Dday: startDate,
      writer: currentUser.uid,
      date: uploadDate,
    };

    const handleUpdate = async (type) => {
      try {
        await type(docRef, {
          Dday: arrayUnion(data),
        }).then(() => {
          handleCancel();
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
    setUploading(false);
  };

  return (
    <>
      {addDday && (
        <div
          className="w-screen h-screen fixed top-0 left-0 z-10"
          id={addDday ? "fadeIn" : "fadeOut"}
        ></div>
      )}
      <div
        className="w-full h-screen fixed left-0 pt-14 itemCenter z-10"
        id={addDday ? "addPostSlideIn" : "addPostSlideOut"}
      >
        <div className="rounded-xl overflow-hidden shadow-md m-4 p-3 bg-bgColor">
          <div className="flex flex-col">
            <span className="w-full h-6 text-textBlack text-md flex justify-center items-center">
              디데이 작성
            </span>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <span className="px-1">제목</span>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="loginInput"
                  onFocus={handleFooter}
                  onBlur={handleFooter}
                  ref={titleRef}
                />
              </li>
              <li>
                <span className="px-1">날짜</span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  // 한글이면 yyyy-MM-dd 영문이면 MM-dd-yyyy로 표시하기
                  dateFormat="yyyy-MM-dd"
                />
              </li>
            </ul>
            <SubmitCancelButton
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
            <div id="dycalendar"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDday;
