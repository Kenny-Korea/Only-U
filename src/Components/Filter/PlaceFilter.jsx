import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

const PlaceFilter = () => {
  return (
    <>
      <div className="w-full h-12 centerItem gap-2">
        <button className="w-6 h-6 bg-white text-main rounded-full shadow-lg">
          <FilterAltRoundedIcon style={{ fontSize: "1rem" }} />
        </button>
        <input
          type="text"
          className="w-60 h-6 rounded-full text-xs pl-3 py-1 outline-none shadow-lg"
          placeholder="Search Location"
        />
        <button className="w-6 h-6 bg-blue-400 text-white rounded-full shadow-lg">
          <SearchRoundedIcon style={{ fontSize: "1rem" }} />
        </button>
      </div>
    </>
  );
};

export default PlaceFilter;
