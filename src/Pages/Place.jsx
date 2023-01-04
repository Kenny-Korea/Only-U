import React from "react";
import AddButton from "../Components/Buttons/AddButton";
import PlaceCard from "../Components/Cards/PlaceCard";

const Place = ({ size, setTitle }) => {
  setTitle("Place");
  const handleDrag = (e) => {
    let x = e.clientX;
    let y = e.target.getBoundingClientRect().left;
    console.log(x, y);
  };

  return (
    <>
      <div className={`${size} centerPage`}>
        <div className="grid grid-cols-2 gap-3" onDragCapture={handleDrag}>
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
