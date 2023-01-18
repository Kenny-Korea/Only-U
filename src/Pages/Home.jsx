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
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ModalDday from "../Components/Modal/ModalDday";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const Home = ({ size, setCurrentPage }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  const { currentUser } = useContext(AuthContext);
  const [addDday, setAddDday] = useState(false);

  useEffect(() => {
    setCurrentPage("Home");
    setHideFooter(false);
  }, []);

  const [Ddays, setDdays] = useState([]);

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const getPosts = () => {
    if (!currentUser?.uid) return;
    onSnapshot(doc(db, "Ddays", currentUser.uid), (snapshot) => {
      setDdays(snapshot.data().Dday);
    });
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    "Ddays",
    getPosts,
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // test
  const DdayList = [1, 2, 3, 4, 5];

  return (
    <>
      <div className={`${size} overflow-y-scroll flex justify-center z-10`}>
        <div className="w-10/12 flex flex-col items-center">
          <div className="w-[35vh] h-[35vh] min-h-[35vh] min-w-[35vh] relative">
            <div className="absolute top-1 right-1 text-white">
              <SettingsRoundedIcon style={{ fontSize: "1rem" }} />
            </div>
            <div className="w-full h-full rounded-full bg-white overflow-hidden flex relative border-8 border-bgColor">
              <div
                className="w-1/2 h-full bg-main bg-cover bg-center border-none"
                style={{ backgroundImage: `url(${currentUser.photoURL})` }}
              ></div>
              <div
                className="w-1/2 h-full bg-main bg-cover bg-center border-none"
                style={{ backgroundImage: `url(${currentUser.photoURL})` }}
              ></div>
              <div className="absolute w-full h-20 bottom-0 bg-gradient-to-b from-transparent to-neutral-600 flex flex-col justify-center items-center gap-1">
                <span className="text-white text-lg font-bold ellipsis w-full text-center h-6 leading-6">
                  Kenny & Sisca
                </span>
                <span className="text-white text-sm flex gap-2">
                  <FavoriteRoundedIcon
                    style={{ fontSize: "1rem", color: "rgb(239, 68, 68)" }}
                  />
                  1550 days
                </span>
              </div>
            </div>
          </div>
          {/* D-day 영역 */}
          <div className="w-full min-h-[40vh] h-[60vh] flex flex-col gap-2 pt-2">
            <div className="pl-3 pr-1 flex justify-between items-center h-8 text-lg text-white bg-main rounded-full">
              <div className="flex items-center gap-2 font-bold">
                <CalendarTodayRoundedIcon style={{ fontSize: "1.2rem" }} />
                Plan
              </div>
              <div className="w-6 h-6 bg-white text-main rounded-full centerItem">
                <AddRoundedIcon
                  style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                  onClick={() => {
                    setAddDday(!addDday);
                  }}
                />
              </div>
            </div>
            <div className="w-full h-4/5 overflow-y-scroll">
              <div className="w-full h-fit flex flex-col gap-2">
                <hr />
                {Ddays?.map((Dday) => {
                  return <DdayCard Dday={Dday} key={Dday.Dday} />;
                })}
              </div>
            </div>
          </div>
          <ModalDday page="home" addDday={addDday} setAddDday={setAddDday} />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
    </>
  );
};

export default Home;
