import React from "react";
import ModifyButton from "../Buttons/ModifyButton";

const DdayCard = () => {
  return (
    <>
      <div className="mx-3 card">
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
    </>
  );
};

export default DdayCard;
