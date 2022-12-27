import React from "react";
import PlaceCard from "../Components/Cards/PlaceCard";

const Place = ({ size, setTitle }) => {
  setTitle("Place");

  return (
    <>
      <div className={`${size} page centerPage`}>
        <div className="grid grid-cols-2 gap-2">
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
        </div>
      </div>
    </>
  );
};

export default Place;
