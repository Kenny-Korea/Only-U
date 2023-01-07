import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";

import Food from "../../Images/Food.png";

const center = { lat: 43.6532225, lng: -79.383186 };
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};

const GoogleMapTest3 = () => {
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: "AIzaSyCuOY8NpVbAD1iHSsmXIo8PfBvDU6dy760",
    // 구글맵뿐만 아니라 places라는 라이브러리도 함께 사용할 것이므로 아래의 내용 추가
    // 변수로 따로 뺀 다음에 불러오는게 렌더링을 최적화하는데 더 도움이 됨
    // libraries: ["places"],
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  // GoogleMap 클릭 시 마커 생성해주는 함수
  const handleMarkers = (e) => {
    setMarkers((current) => [
      ...current,
      { lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() },
    ]);
  };

  // 위의 handleMarkers 함수를 onClickMap 함수에 넣음
  // Marker가 state 변화마다 계속 렌더링 되는 것을 막아주기 위해 useCallback 사용
  const onClickMap = useCallback(handleMarkers, []);

  // 왜 사용하는지 아직 잘 모르겠음
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    console.log("loaded");
  }, []);

  const inputRef = useRef();
  const google = window.google;
  const [map, setMap] = useState(null);

  const searchLocation = () => {
    const request = {
      // query: "Museum of Contemporary Art Australia",
      query: inputRef.current.value,
      fields: ["name", "geometry"],
    };
    const getPlace = new google.maps.places.PlacesService();
    getPlace.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
      console.log(results);
    });
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <div className="page">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          // onClick={onClickMap}
          onClick={(e) => {
            console.log(e);
          }}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  url: Food,
                  scaledSize: new window.google.maps.Size(30, 30),
                  // origin과 anchor를 이용해서 마우스의 어떤 위치에 Marker를 넣을지를 정함
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 20),
                }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            );
          })}
          {selected ? (
            // InfoWindow는 position 속성이 필수
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              // selected를 null로 초기화 해줘야 다른 spot을 클릭해도 계속 동작함
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Bear Spotted!</h2>
                <p>Spotted</p>
                {/* <p>Spotted {formatRelative(selected.time, new Date())}</p> */}
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
        <Autocomplete>
          <input type="text" placeholder="Search Location" ref={inputRef} />
        </Autocomplete>
        <button onClick={searchLocation}>Search</button>
      </div>
    </>
  );
};

export default GoogleMapTest3;
