import React, { useContext, useEffect, useRef, useState } from "react";
import DdayCard from "../Components/Cards/DdayCard";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import HomeProfile from "../Components/Profile/HomeProfile";
import BeenTogether from "../Components/Others/BeenTogether";
import AddButton from "../Components/Buttons/AddButton";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../atoms";
import { AuthContext } from "../Context/AuthContext";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Home = ({ size, setCurrentPage }) => {
  // 로컬 스토리지에 시작일 저장
  // const checkDday = localStorage.getItem("Dday");
  // const startDay = new Date(Date.UTC(2022, 12, 24));
  // const today = new Date();
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setCurrentPage("Home");
    setHideFooter(false);
  }, []);

  const titleRef = useRef();
  const inputRef = useRef();
  const briefRef = useRef();
  const textAreaRef = useRef();

  // test
  const DdayList = [1, 2, 3, 4, 5];

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
      <div className={`${size} overflow-y-scroll flex justify-center z-10`}>
        <div className="w-10/12 flex flex-col items-center">
          <div className="w-[30vh] h-[30vh] rounded-full bg-white overflow-hidden flex relative border-8 border-bgColor">
            <div
              className="w-[15rem] h-60 bg-pink-300 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentUser.photoURL})` }}
            ></div>
            <div
              className="w-[15rem] h-60 bg-pink-300 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentUser.photoURL})` }}
            ></div>
            <div className="absolute w-full h-28 bottom-0 bg-gradient-to-b from-transparent to-neutral-600 flex flex-col justify-center items-center gap-2">
              <span className="text-white text-lg font-bold">
                Kenny & Sisca
              </span>
              <span className="text-white text-sm flex gap-2">
                <CalendarTodayRoundedIcon style={{ fontSize: "1rem" }} />
                1550 days
              </span>
            </div>
          </div>

          {/* D-day 영역 */}
          <div className="w-full h-[calc(70vh-8rem)] flex flex-col gap-2 pt-2">
            <div className="pl-3 pr-1 flex justify-between items-center h-8 text-lg text-white bg-main rounded-full">
              <div className="flex items-center gap-2 font-bold">
                <CalendarTodayRoundedIcon style={{ fontSize: "1.2rem" }} />
                Plan
              </div>
              <div className="w-6 h-6 bg-white text-main rounded-full centerItem">
                <AddRoundedIcon
                  style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                />
              </div>
            </div>
            <div className="w-full h-4/5 overflow-y-scroll">
              <div className="w-full h-fit flex flex-col gap-2">
                <hr />
                {DdayList.map((item, index) => {
                  return <DdayCard key={item + index} />;
                })}
              </div>
            </div>
          </div>
          {/* <AddButton page="home" /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
