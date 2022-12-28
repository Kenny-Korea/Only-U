// import React, { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from "../../ApiKeys";

// const GoogleMapTest1 = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });
//   if (!isLoaded) return <div>loading...</div>;

//   return (
//     <>
//       <Map />
//     </>
//   );
// };

// function Map() {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
//   const onClickPlace = () => {
//     console.log("test");

//     return <Marker position={{ lat: 44, lng: -80 }} />;
//   };

//   // 3가지 prop을 항상 지정해줘야 함
//   return (
//     <>
//       <GoogleMap
//         zoom={10}
//         center={center}
//         mapContainerClassName="googleMapTest"
//         onClick={onClickPlace}
//       >
//         {onClickPlace()}
//         <div className="w-20 h-20 bg-white z-50">hello</div>
//       </GoogleMap>
//     </>
//   );
// }

// export default GoogleMapTest1;
