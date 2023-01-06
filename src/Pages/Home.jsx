import React, { useContext, useRef, useState } from "react";
import DdayCard from "../Components/Cards/DdayCard";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import HomeProfile from "../Components/Profile/HomeProfile";
import BeenTogether from "../Components/Others/BeenTogether";
import AddButton from "../Components/Buttons/AddButton";
import { AuthContext } from "../Context/AuthContext";

const Home = ({ size, setTitle }) => {
  const { currentUser } = useContext(AuthContext);
  setTitle("Home");

  // 로컬 스토리지에 시작일 저장
  const checkDday = localStorage.getItem("Dday");
  const startDay = new Date(Date.UTC(2022, 12, 24));
  const today = new Date();

  const titleRef = useRef();
  const inputRef = useRef();
  const briefRef = useRef();
  const textAreaRef = useRef();

  // test
  const DdayList = [1, 2, 3, 4, 5, 6, 7];

  const [editBio, setEditBio] = useState(false);

  const handleEditTitle = () => {
    setEditBio(!editBio);
  };

  const handleSaveTitle = () => {
    const changedTitle = inputRef.current.value;
    const changedBrief = textAreaRef.current.value;
    localStorage.setItem("Title", changedTitle);
    localStorage.setItem("Brief", changedBrief);
    setEditBio(!editBio);
  };

  const getTitle = () => {
    const title = localStorage.getItem("Title");
    if (title) {
      return title;
    } else {
      return "제목을 설정해주세요";
    }
  };

  const getBrief = () => {
    const brief = localStorage.getItem("Brief");
    if (brief) {
      return brief;
    } else {
      return "내용을 입력해주세요";
    }
  };

  return (
    <>
      <div className="w-full h-72 bg-slate-200 flex flex-col overflow-y-scroll">
        <div className="w-full font-bold text-2xl pt-2 flex justify-between items-center p-3 mt-1">
          <input
            type="text"
            className={!editBio ? "hidden" : null}
            placeholder={editBio ? titleRef.current.textContent : null}
            ref={inputRef}
          />

          <span className={editBio ? "hidden" : null} ref={titleRef}>
            {getTitle()}
          </span>

          {editBio ? (
            <SaveAsRoundedIcon onClick={handleSaveTitle} />
          ) : (
            <ModeEditRoundedIcon onClick={handleEditTitle} />
          )}
        </div>

        <div className="w-full h-36 bg-pink-200 flex justify-between items-center">
          <HomeProfile />
          <BeenTogether />
          <HomeProfile />
        </div>
        <textarea
          cols="30"
          rows="2"
          style={{ resize: "none" }}
          className={`m-3 ${!editBio && "hidden"}`}
          placeholder={editBio ? briefRef.current.textContent : null}
          ref={textAreaRef}
        ></textarea>
        <div className={`w-full p-3 ${editBio && "hidden"}`} ref={briefRef}>
          {getBrief()}
        </div>
      </div>

      {/* D-day 영역 */}
      <span className="submenu">D-day</span>
      <div className="w-full centerPage">
        {DdayList.map((item, index) => {
          return <DdayCard key={item + index} />;
        })}
      </div>
      <AddButton page="home" />
    </>
  );
};

export default Home;
