import React, { useEffect, useRef, useState } from "react";
import SubmitCancelButton from "../Buttons/SubmitCancelButton";
import Modal from "./Modal";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../../atoms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalHome = ({ homeSettings, setHomeSettings }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  const [startDate, setStartDate] = useState();
  useEffect(() => {
    if (localStorage.getItem("startDate")) {
      setStartDate(parseInt(localStorage.getItem("startDate")));
    } else {
      setStartDate(new Date());
    }
  }, []);

  const profileNameRef = useRef();

  const handleFooter = (e) => {
    setHideFooter(!hideFooter);
  };

  const handleSubmit = () => {
    localStorage.setItem("profileName", profileNameRef.current.value);
    localStorage.setItem("startDate", startDate.getTime());
    setStartDate(null);
    setHomeSettings(!homeSettings);
  };
  const handleCancel = () => {
    setHomeSettings(!homeSettings);
  };
  return (
    <>
      <Modal modal={homeSettings}>
        <span className="w-full h-6 text-textBlack text-md flex justify-center items-center">
          프로필 설정
        </span>
        <ul className="flex flex-col gap-4 text-sm">
          <li>
            <span className="px-1">프로필 이름</span>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="loginInput"
              onFocus={handleFooter}
              onBlur={handleFooter}
              ref={profileNameRef}
            />
          </li>
          <li>
            <span className="px-1">만난 날짜</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              // 한글이면 yyyy-MM-dd 영문이면 MM-dd-yyyy로 표시하기
              dateFormat="yyyy-MM-dd"
            />
          </li>
        </ul>
        <SubmitCancelButton
          others="저장"
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default ModalHome;
