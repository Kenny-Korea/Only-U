import React from "react";
import AddButton from "../Components/Buttons/AddButton";
import PlaceCard from "../Components/Cards/PlaceCard";

const Place = ({ size, setTitle }) => {
  setTitle("Place");

  return (
    <>
      <div className={`${size} page centerPage`}>
        <div className="grid grid-cols-2 gap-3">
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
        </div>
        <AddButton page="place" />
      </div>
    </>
  );
};

export default Place;
