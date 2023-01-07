import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const PlaceFilter = () => {
  return (
    <>
      <div className="w-full h-14 bg-pink-200">
        <input
          type="text"
          className="w-60 rounded-full text-xs pl-3 py-1 outline-none shadow-lg"
          placeholder="Search Location"
        />
        <button className="w-6 h-6 bg-blue-400 rounded-full shadow-lg">
          <SearchRoundedIcon style={{ fontSize: "1rem", color: "white" }} />
        </button>
      </div>
    </>
  );
};

export default PlaceFilter;
