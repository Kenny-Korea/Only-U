import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
  getPlace,
} from "@react-google-maps/api";

const center = { lat: 43.6532225, lng: -79.383186 };
const libraries = ["places"];
const mapContainerStyle = {
  width: "90%",
  height: "10rem",
};

const ModalPlace = ({ addPlace, setAddPlace }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // 구글맵뿐만 아니라 places라는 라이브러리도 함께 사용할 것이므로 아래의 내용 추가
    // 변수로 따로 뺀 다음에 불러오는게 렌더링을 최적화하는데 더 도움이 됨
    // libraries: ["places"],
    libraries,
  });

  // 왜 사용하는지 아직 잘 모르겠음
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    console.log("loaded");
  }, []);

  const google = window.google;
  const [place, setPlace] = useState(null);

  const handleClickPlace = async (e) => {
    if (!e.placeId) return;
    const placeRef = e.placeId;
    let request = {
      placeId: placeRef,
      fields: [
        "name",
        "icon",
        "opening_hours",
        "reviews",
        "address_components",
        "photos",
      ],
    };
    let service = new google.maps.places.PlacesService(
      document.getElementById("map")
    );
    service.getDetails(request, callback);
    function callback(data, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(data);
        if (place) {
          let copy = { ...place };
          copy = data;
          setPlace(copy);
        } else {
          setPlace(data);
        }
      }
    }
  };

  const handleUsePlaceName = () => {
    if (!place) return;
  };

  const handlePreview = () => {
    for (let i = 0; i < 5; i++) {
      return place.photos[i].getUrl;
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <div id="map"></div>

      <div
        className="w-full h-[calc(100vh-7.5rem)] fixed mt-14 itemCenter bg-white bg-opacity-50"
        id={addPlace ? "addPostSlideIn" : "addPostSlideOut"}
      >
        <div className="rounded-xl overflow-hidden shadow-md m-2 p-2 bg-slate-200">
          <div className="flex flex-col">
            <span className="mx-3">장소 작성</span>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              onClick={handleClickPlace}
              onLoad={onMapLoad}
            ></GoogleMap>
            {place && (
              <div className="card">
                <div className="flex w-full">
                  <img
                    src={place?.photos[0].getUrl()}
                    alt="pp"
                    className="w-1/5 h-10 object-contain"
                  />
                </div>
                <span>name: {place?.name}</span>
                <div className="h-20 overflow-y-scroll">
                  {place?.reviews.map((review) => {
                    return (
                      <div className="flex flex-col mb-3">
                        <div className="">
                          <span className="text-md">{review.author_name}</span>
                          <span className="text-md">{review.rating} / 5</span>
                        </div>
                        <span className="text-xs">{review.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div>
              <input
                type="text"
                placeholder="Place Name"
                className="input"
                onChange={handleUsePlaceName}
              />
              <input type="checkbox" id="name" />
              <label htmlFor="name">지도명 사용</label>
            </div>
            <input type="range" defaultValue={1} min={1} max={5} step={1} />
            <input type="text" placeholder="Description" className="input" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPlace;
