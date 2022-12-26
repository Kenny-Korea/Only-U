import React from "react";
import ModifyButton from "../Buttons/ModifyButton";

const DdayCard = () => {
  return (
    <>
      <div className="card cardItems">
        <div className="flex justify-between items-center">
          <span className="text-bold text-xl">롯데월드 데이트</span>
          <ModifyButton />
        </div>
        <div className="flex justify-between items-center">
          <span>2022 / 12 / 25</span>
          <span className="text-xl text-brightRed">D - 3</span>
        </div>
      </div>
    </>
  );
};

export default DdayCard;
