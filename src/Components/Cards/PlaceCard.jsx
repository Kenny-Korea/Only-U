import React from "react";
import unnamed from "../../Images/toongtoong.png";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PlaceButton from "../Buttons/PlaceButton";

const PlaceCard = () => {
  console.log("Price is quite reasonable and the steak is awesome".length);
  const restrictTextLength = (text, max) => {
    if (text.length < max) return text;
    return text.substring(0, max) + "...";
  };

  return (
    <>
      <div className="w-44 h-44 shadow-md">
        <div
          className="w-full h-2/3"
          style={{ backgroundImage: `url(${unnamed})` }}
        >
          <div className="m-1 float-left">
            <PlaceButton />
          </div>
          <div className="w-full h-full"></div>
        </div>
        <div className="w-full h-1/3 bg-white flex flex-col leading-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">
              {restrictTextLength("Dino's Steak", 14)}
            </span>
            <LocationOnRoundedIcon />
          </div>
          <span>
            {restrictTextLength(
              "Price is quite reasonable and the steak is awesome",
              48
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default PlaceCard;
