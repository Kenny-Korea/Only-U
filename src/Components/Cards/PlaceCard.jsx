import React from "react";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PlaceButton from "../Buttons/PlaceButton";
import ModifyButton from "../Buttons/ModifyButton";

const PlaceCard = ({ place }) => {
  const restrictTextLength = (text, max) => {
    if (text.length < max + 2) return text;
    return text.substring(0, max) + "...";
  };

  const displayRate = () => {
    const parsedNum = parseInt(place.rate);
    let result = "";
    for (let i = 0; i < parsedNum; i++) {
      result += "★";
    }
    return result;
  };
  return (
    <>
      <div className="w-44 h-44 shadow-md">
        <div className="w-full h-2/3 relative">
          <img
            src={place?.url}
            alt="pp"
            className="w-full h-full object-cover"
          />
          <div className="m-1 absolute top-0 left-0">
            <PlaceButton />
          </div>
          <div className="m-1 absolute top-0 right-0">
            <ModifyButton />
          </div>
          <div
            className="w-full h-1/3 bg-gradient-to-b from-transparent to-slate-600
            opacity-80 absolute bottom-0"
          ></div>
          <div className="w-full h-1/3 absolute bottom-0 flex items-end pl-1 text-yellow-300">
            {displayRate()}
          </div>
        </div>
        <div className="w-full h-1/3 bg-white flex flex-col leading-4 border-t-2 border-t-teal-900">
          <div className="flex justify-between items-center">
            <span className="font-bold text-md px-1">
              {restrictTextLength(place?.title, 16)}
            </span>
            <LocationOnRoundedIcon />
          </div>
          <span className="text-xs leading-tight px-1">
            {restrictTextLength(place?.description, 56)}
          </span>
        </div>
      </div>
    </>
  );
};

export default PlaceCard;
