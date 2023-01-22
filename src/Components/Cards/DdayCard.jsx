import React, { useState } from "react";
import ModifyButton from "../Buttons/ModifyButton";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const DdayCard = ({ Dday, index }) => {
  const savedDate = Dday.Dday.seconds * 1000;
  const today = new Date().getTime();
  const gap = savedDate - today;
  const dateGap = Math.ceil(new Date(gap).getTime() / 1000 / 60 / 60 / 24);
  const [editClicked, setEditClicked] = useState(false);

  const calculateDday = () => {
    if (dateGap < 0) return "D + " + Math.abs(dateGap);
    if (dateGap > 0) return "D - " + Math.abs(dateGap);
    return "D-Day";
  };

  const handleUpward = () => {
    console.log(Dday);
  };

  const handleDownward = () => {
    console.log(Dday[1]);
  };

  const onClickEdit = () => {
    setEditClicked(!editClicked);
  };

  return (
    <>
      <hr className="border-0 h-[1px] bg-main flex" />
      {Dday && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-between">
            <KeyboardArrowUpRoundedIcon
              style={{ fontSize: "1.2rem" }}
              onClick={handleUpward}
            />
            <KeyboardArrowDownRoundedIcon
              style={{ fontSize: "1.2rem" }}
              onClick={handleDownward}
            />
          </div>
          <div className="mx-5 w-full flex justify-between">
            <div className="w-32 flex flex-col gap-1 ellipsis">
              <span className="text-bold text-sm">{Dday.title}</span>
              <span className="text-xs">
                {new Intl.DateTimeFormat("ko-KR").format(
                  Dday.Dday.seconds * 1000
                )}
              </span>
            </div>
            <div className="text-2xl centerItem">
              <span className="text-main font-bold">{calculateDday()}</span>
            </div>
          </div>
          <ModifyButton item={Dday} docName="Ddays" />
        </div>
      )}
    </>
  );
};

export default DdayCard;
