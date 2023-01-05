import React, { useContext, useEffect, useState } from "react";
import AddButton from "../Components/Buttons/AddButton";
import PlaceCard from "../Components/Cards/PlaceCard";
import { onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import ModalPlace from "../Components/Modal/ModalPlace";

const Place = ({ size, setTitle }) => {
  setTitle("Place");
  const [addPlace, setAddPlace] = useState(false);
  const [places, setPlaces] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   const getPlaces = () => {
  //     const unsub = onSnapshot(
  //       doc(db, "places", currentUser.uid),
  //       (snapshot) => {
  //         setPlaces(snapshot.data().place);
  //       }
  //     );
  //     // clean-up
  //     return () => {
  //       unsub();
  //     };
  //   };
  //   currentUser.uid && getPlaces();
  // }, [currentUser.uid]);

  return (
    <>
      <div className={`${size} centerPage`}>
        <div className="grid grid-cols-2 gap-3">
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
        </div>
        <AddButton page="place" addPlace={addPlace} setAddPlace={setAddPlace} />
        <ModalPlace addPlace={addPlace} setAddPlace={setAddPlace} />
      </div>
    </>
  );
};

export default Place;
