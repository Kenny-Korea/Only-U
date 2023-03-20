import React, { useContext } from "react";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ModifyButton from "../Buttons/ModifyButton";
import { AuthContext } from "../../Context/AuthContext";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";

const PlaceCard = ({ place }) => {
  const displayRatings = () => {
    const parsedNum = parseInt(place.rate);
    let result = "";
    for (let i = 0; i < parsedNum; i++) {
      result += "★";
    }
    return result;
  };
  return (
    <>
      <div className="w-full h-fit min-h-[5rem] rounded-md bg-white shadow-md mb-3 p-2 flex gap-2">
        <img
          src={place?.url}
          alt="pp"
          className="w-24 h-full min-h-[4.5rem] object-cover rounded-lg"
        />
        <div className="w-full flex flex-col relative">
          <div className="flex justify-between">
            <span className="text-sm">{place?.title}</span>
            {/* <LocationOnRoundedIcon /> */}
            <ModifyButton item={place} docName="places" />
          </div>
          <span className="text-sm text-starColor">{displayRatings()}</span>
          <span className="text-xs">{place?.content}</span>
          <div className="text-xs h-4"></div>
          <span className="text-xs text-gray-500 absolute block bottom-0 right-0">
            visited at 2022.01.02
          </span>
        </div>
      </div>
      {/* <div className="w-screen bg-transparent flex justify-around mt-4">
        <div className="w-[calc(100vw-6rem)] min-h-[4rem] flex justify-between bg-transparent relative">
          <div className="w-7 h-7 bg-brightRed rounded-full border-4 border-bgColor centerItem absolute -top-2 -left-2">
            {place?.type === "Food" ? (
              <FastfoodRoundedIcon
                style={{ fontSize: "0.8rem", color: "white" }}
              />
            ) : (
              <PlaceRoundedIcon
                style={{ fontSize: "0.8rem", color: "white" }}
              />
            )}
          </div>
          <img
            src={place?.url}
            alt="pp"
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="ml-4 w-[calc(100%-5rem)] h-fit bg-white rounded-md shadow-md flex flex-col p-1 gap-0">
            <div className="flex justify-between">
              <span className="text-sm">
                {restrictTextLength(place?.title, 14)}
              </span>
              <div className="flex gap-1">
                <LocationOnRoundedIcon style={{ fontSize: "1.2rem" }} />
                <ModifyButton />
              </div>
            </div>
            <span className="text-sm text-starColor">{displayRate()}</span>
            <span className="text-xs">
              {restrictTextLength(place?.description, 36)}
            </span>
          </div>
          <div
            className="absolute top-3 -right-2 w-0 h-0 border-l-8 border-t-8
           border-t-transparent border-b-8 border-b-transparent border-l-white"
          ></div>
        </div>
        <img
          src={currentUser.photoURL}
          alt="pp"
          className="w-10 h-10 rounded-full shadow-md object-cover"
        />
      </div> */}
    </>
  );
};

export default PlaceCard;
{
  /* <div className="m-1 absolute top-0 left-0">
              <PlaceButton />
            </div>
            <div className="m-1 absolute top-0 right-0">
              <ModifyButton />
            </div> */
}
{
  /* <div
              className="w-full h-1/3 bg-gradient-to-b from-transparent to-slate-600
            opacity-80 absolute bottom-0"
            ></div>
            <div className="w-full h-1/3 absolute bottom-0 flex items-end pl-1 text-yellow-300">
              {displayRate()}
            </div> */
}

{
  /* <div className="w-full h-1/3 bg-white flex flex-col">
            <div className="flex justify-between items-center">
              <span className="font-bold text-md px-1">
                {restrictTextLength(place?.title, 16)}
              </span>
              <LocationOnRoundedIcon />
            </div>
            <span className="text-xs leading-tight px-1">
              {restrictTextLength(place?.description, 56)}
            </span>
          </div> */
}
