import React from "react";
import DdayCard from "../Components/Cards/DdayCard";
import TabBottom from "../Components/Layout/Footer";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import unnamed from "../Images/unnamed.png";
import hearts from "../Images/Hearts.png";
import HomeProfile from "../Components/Profile/HomeProfile";
import BeenTogether from "../Components/Others/BeenTogether";

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
        <div className="w-full h-80 bg-slate-200 flex flex-col">
          <span className="text-2xl flex justify-center">Gwangja Couple</span>
          <SettingsOutlinedIcon />
          <div className="w-full h-36 bg-pink-200 flex justify-between items-center">
            <HomeProfile />
            <BeenTogether />
            <HomeProfile />
          </div>
        </div>

        {/* D-day 영역 */}
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
