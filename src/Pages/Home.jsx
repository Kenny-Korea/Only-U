import React from "react";
import DdayCard from "../Components/Cards/DdayCard";
import TabBottom from "../Components/Layout/Footer";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Home = ({ size, setTitle }) => {
  setTitle("Home");

  // 로컬 스토리지에 시작일 저장
  const checkDday = localStorage.getItem("Dday");
  const startDay = new Date(Date.UTC(2022, 12, 24));
  const today = new Date();

  // test
  const DdayList = [1, 2, 3];

  return (
    <>
      <div className={`${size} page`}>
        <div className="flex">
          <span className="submenu mr-3">우리가 만난지</span>
          <SettingsOutlinedIcon />
        </div>
        <div className="w-full centerPage">
          <div className="card">
            <span className="text-xl text-brightRed">
              {today.getDate() - startDay.getDate() + 1} 일째
            </span>
          </div>
        </div>
        <span className="submenu">D-day</span>
        <div className="w-full centerPage">
          {DdayList.map((item, index) => {
            return <DdayCard key={item + index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
