import React from "react";
import { googleMap } from "../../ApiKeys";

const WritingPlace = () => {
  const GOOGLEMAP_API = googleMap.apiKey;
  return (
    <>
      <div className="page">
        <input type="text" />
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </>
  );
};

export default WritingPlace;
