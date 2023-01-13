import React from "react";
import ModifyButton from "../Buttons/ModifyButton";

const DdayCard = () => {
  return (
    <>
      <hr className="border-0 h-[1px] bg-main" />
      <div className="px-3">
        <div className="flex justify-between items-center">
          <span className="text-bold text-sm text-goodPink">
            롯데월드 데이트
          </span>
          <ModifyButton />
        </div>
        <div className="text-xs flex justify-between items-center">
          <span>2022 / 12 / 25</span>
          <span className="text-xl text-brightRed">D - 4</span>
        </div>
      </div>
      {/* <hr className="border-0 h-[1px] bg-main" /> */}
    </>
  );
};

export default DdayCard;
