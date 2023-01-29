import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

import AddButton from "../Components/Buttons/AddButton";
import PlaceCard from "../Components/Cards/PlaceCard";
import { onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import ModalPlace from "../Components/Modal/ModalPlace";
import PlaceFilter from "../Components/Filter/PlaceFilter";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../atoms";
import { PartnerContext } from "../Context/PartnerContext";

const Place = ({ size, setCurrentPage }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  useEffect(() => {
    setCurrentPage("Place");
    setHideFooter(false);
  }, []);
  const [addPlace, setAddPlace] = useState(false);
  const [places, setPlaces] = useState([]);
  const { partnerInfo } = useContext(PartnerContext);

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const getPlaces = () => {
    if (!partnerInfo) return;
    onSnapshot(doc(db, "places", partnerInfo.combinedId), (snapshot) => {
      if (!snapshot.data()) return;
      setPlaces(snapshot.data().place);
    });
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    "place",
    getPlaces,
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div className={`${size} flex flex-col justify-center z-10`}>
        <PlaceFilter />
        <div className="w-full h-[calc(100vh-11rem)] overflow-y-scroll flex justify-center">
          <div className="w-10/12">
            {Array.isArray(places) && places.length === 0
              ? "새 글을 작성해보세요"
              : null}
            {/* <div className="grid grid-cols-2 gap-3"> */}
            {places?.map((place, index) => {
              return <PlaceCard key={addPlace + index} place={place} />;
            })}
            {/* </div> */}
            <AddButton
              page="place"
              addPlace={addPlace}
              setAddPlace={setAddPlace}
            />
            <ModalPlace addPlace={addPlace} setAddPlace={setAddPlace} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Place;
