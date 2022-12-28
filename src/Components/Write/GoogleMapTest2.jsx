// import React, { useEffect, useRef, useState } from "react";
// // import usePlacesAutocomplete from "use-places-autocomplete"
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from "../../ApiKeys";

// const center = { lat: 48.8584, lng: 2.2945 };
// const google = window.google;
// const libraries = ["places"];

// const GoogleMapTest2 = () => {
//   // API 가동에 필요한 각종 설정들을 로드하는 함수
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });
//   if (!isLoaded) {
//     <div>loading...</div>;
//   }

//   const [map, setMap] = useState(null);
//   const [directionResponse, setDirectionResponse] = useState(null);
//   const [distance, setDistance] = useState("");
//   const [duration, setDuration] = useState("");

//   const originRef = useRef();
//   const destinationRef = useRef();

//   const [office, setOffice] = useState(center);

//   async function getLocation(location) {
//     const latitude = location.lat();
//     const longitude = location.lng();
//     console.log({ lat: typeof latitude, lng: longitude });
//     setOffice({ lat: latitude, lng: longitude });
//     console.log(office);
//     return <Marker position={office} />;
//   }

//   async function calculateRoute() {
//     if (originRef.current.value === "" || destinationRef.current.value === "") {
//       return;
//     }
//     const directionsService = new google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: google.maps.TravelMode.DRIVING,
//     });
//     setDirectionResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   }

//   const clearRoute = () => {
//     setDirectionResponse(null);
//     setDistance("");
//     setDuration("");
//     originRef.current.value = "";
//     destinationRef.current.value = "";
//   };

//   return (
//     <>
//       {/* <div className="relative"> */}
//       <div
//         className="w-60 h-96 absolute top-0 left-0 bg-slate-200 z-10"
//         // 클릭하면 center로 이동하는 메소드
//       >
//         <Autocomplete>
//           <input type="text" placeholder="origin" ref={originRef} />
//         </Autocomplete>
//         <Autocomplete>
//           <input type="text" placeholder="destination" ref={destinationRef} />
//         </Autocomplete>
//         <div onClick={clearRoute}>clear</div>
//         <div onClick={calculateRoute}>calculate</div>
//         <div>distance: {distance}</div>
//         <div>duration: {duration}</div>
//         <Autocomplete>
//           <input type="text" placeholder="destination" ref={destinationRef} />
//         </Autocomplete>
//         {/* <button onClick={panToPlace}>검</button> */}

//         {/* setOffice */}
//         {/* <div>{office}</div> */}

//         <div
//           className="w-10 h-10 bg-pink-200 text-sm"
//           onClick={() => map.panTo(office)}
//         >
//           panTo
//         </div>
//         <div
//           onClick={() => {
//             console.log(map);
//           }}
//         >
//           map?
//         </div>
//       </div>
//       <GoogleMap
//         zoom={10}
//         center={center}
//         mapContainerClassName="googleMapTest"
//         options={{ mapTypeControl: false, fullscreenControl: false }}
//         onLoad={(map) => setMap(map)}
//         onClick={(e) => {
//           getLocation(e.latLng);
//         }}
//       >
//         <Marker position={center} />
//         {directionResponse && (
//           <DirectionsRenderer directions={directionResponse} />
//         )}
//       </GoogleMap>
//       {/* </div> */}
//     </>
//   );
// };

// const Map = () => {
//   // 3가지 prop을 항상 지정해줘야 함
//   return <></>;
// };

// export default GoogleMapTest2;
