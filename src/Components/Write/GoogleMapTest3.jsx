import React, { useCallback, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from "../../ApiKeys";
import Food from "../../Images/Food.png";

const center = { lat: 43.6532225, lng: -79.383186 };
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const GoogleMapTest3 = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // 구글맵뿐만 아니라 places라는 라이브러리도 함께 사용할 것이므로 아래의 내용 추가
    // 변수로 따로 뺀 다음에 불러오는게 렌더링을 최적화하는데 더 도움이 됨
    // libraries: ["places"],
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const handleMarkers = (e) => {
    setMarkers((current) => [
      ...current,
      { lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() },
    ]);
  };

  // Marker가 state 변화마다 계속 렌더링 되는 것을 막아주기 위해 useCallback 사용
  const onClickMap = useCallback(() => {}, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <div className="">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          onClick={handleMarkers}
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
              />
            );
          })}
        </GoogleMap>
      </div>
    </>
  );
};

export default GoogleMapTest3;
