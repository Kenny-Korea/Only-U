import React, { useCallback, useContext, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
  getPlace,
} from "@react-google-maps/api";
import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ModalPreview from "./ModalPreview";
import { db, storage } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import { v4 as uuid } from "uuid";
import SubmitCancelButton from "../Buttons/SubmitCancelButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../../atoms";
import dotenv from "dotenv";

const center = { lat: 43.6532225, lng: -79.383186 };
const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "12rem",
};
const options = {
  // disableDefaultUI: true,
};

const ModalPlace = ({ addPlace, setAddPlace }) => {
  dotenv.config();
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
  }, []);

  const { currentUser } = useContext(AuthContext);

  const google = window.google;
  const [place, setPlace] = useState(null);
  const [preview, setPreview] = useState(null);
  const [rate, setRate] = useState("3");
  const placeNameRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();
  const [seeReview, setSeeReview] = useState(false);
  const [placeType, setPlaceType] = useState("");
  const [fileName, setFileName] = useState();
  const rateRef = useRef();
  const [uploading, setUploading] = useState(false);

  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);

  const handleFooter = (e) => {
    setHideFooter(!hideFooter);
  };

  const handleCancel = () => {
    setAddPlace(false);
    setPlace(null);
    setPreview(null);
    setRate("3");
    setSeeReview(false);
    setFileName(null);
    placeNameRef.current.value = "";
    descriptionRef.current.value = "";
    fileRef.current.value = null;
  };

  const toggleReview = () => {
    setSeeReview(!seeReview);
  };

  const handleRate = (e) => {
    setRate(e.target.id);

    const parsedRate = parseInt(e.target.id);
    for (let i = 0; i < 5; i++) {
      if (i < parsedRate) {
        rateRef.current.children[i].innerHTML = "★";
      } else {
        rateRef.current.children[i].innerHTML = "☆";
      }
    }
  };

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
        "rating",
        "place_id",
      ],
    };
    let service = new google.maps.places.PlacesService(
      document.getElementById("map")
    );
    service.getDetails(request, callback);
    function callback(data, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (place) {
          let copy = { ...place };
          copy = data;
          setPlace(copy);
          let container = [];
          for (let i = 0; i < 5; i++) {
            container.push(place.photos[i].getUrl);
          }
          setPreview(container);
        } else {
          setPlace(data);
          let container = [];
          for (let i = 0; i < 5; i++) {
            container.push(place.photos[i].getUrl);
          }
          setPreview(container);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (uploading) return;
    setUploading(true);
    const uploadDate = Timestamp.now();
    const res = await getDoc(doc(db, "places", currentUser.uid));
    const docRef = doc(db, "places", currentUser.uid);
    let imageURL;
    const uploadedFile = fileRef.current.files[0];
    if (uploadedFile) {
      const storageRef = ref(storage, currentUser.uid + uploadDate);
      const uploadTask = await uploadBytesResumable(storageRef, uploadedFile, {
        contentType: "image/jpeg",
      });
      await getDownloadURL(uploadTask.ref).then((url) => {
        imageURL = url;
      });
    } else if (preview) {
      imageURL = preview[0]();
    } else {
      // default 이미지 넣어줘야 함
      imageURL = "";
    }

    const data = {
      id: uuid(),
      title: placeNameRef.current.value,
      description: descriptionRef.current.value,
      placeId: place.place_id,
      rate: rate,
      type: placeType,
      url: imageURL,
      writer: currentUser.uid,
      date: uploadDate,
    };
    const handleUpdate = async (type) => {
      try {
        await type(docRef, {
          place: arrayUnion(data),
        }).then(() => {
          handleCancel();
        });
      } catch {
        console.log("err");
      }
    };
    if (!res.exists()) {
      handleUpdate(setDoc);
    } else {
      handleUpdate(updateDoc);
    }
    setUploading(false);
  };

  const [placeNameValue, setPlaceNameValue] = useState(null);

  const handleCopyNameFromMap = (e) => {
    if (!place?.name) return;
    setPlaceNameValue(place.name);
    // placeNameRef.current.value = place.name;
  };

  const handlePlaceName = (e) => {
    setPlaceNameValue(e.target.value);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  const checkedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className="w-3 h-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );

  const test = (e) => {
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      {addPlace && (
        <div
          className="w-screen h-screen fixed top-0 left-0 z-10"
          id={addPlace ? "fadeIn" : "fadeOut"}
        ></div>
      )}
      <div
        className="w-full h-screen fixed pt-14 left-0 itemCenter z-10"
        id={addPlace ? "addPostSlideIn" : "addPostSlideOut"}
      >
        <div className="rounded-xl overflow-hidden shadow-md m-2 p-2 bg-white flex flex-col relative">
          <div className="absolute top-2 left-2 z-10 flex gap-1 m-1">
            <Autocomplete>
              <input
                type="text"
                className="w-60 rounded-full text-xs px-3 py-1 outline-none shadow-lg"
                placeholder="Search Location"
                onFocus={handleFooter}
                onBlur={handleFooter}
              />
            </Autocomplete>
            <button className="w-6 h-6 bg-blue-400 rounded-full shadow-lg">
              <SearchRoundedIcon style={{ fontSize: "1rem", color: "white" }} />
            </button>
            <button className="w-6 h-6 bg-slate-300 rounded-full shadow-lg">
              <RefreshRoundedIcon
                style={{ fontSize: "1rem", color: "black" }}
              />
            </button>
          </div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            onClick={handleClickPlace}
            onLoad={onMapLoad}
            options={options}
          ></GoogleMap>
          <div id="map"></div>
          {place && (
            <div className="card">
              {preview && (
                <div className="flex w-full">
                  {preview?.map((image) => {
                    return (
                      <img
                        src={image()}
                        alt="pp"
                        className="w-1/5 h-10 object-cover border-x-2 border-white"
                      />
                    );
                  })}
                </div>
              )}
              <p>{place?.name}</p>
              <p className="text-xs">{place?.rating}</p>
              <div className="text-xs leading-tight">
                {place?.address_components.map((address) => {
                  return address.long_name + " ";
                })}
              </div>
              <div
                onClick={toggleReview}
                className="text-xs text-gray-600 w-12"
              >
                {place && seeReview ? "리뷰 접기" : "리뷰 보기"}
              </div>
              <div className={seeReview ? "h-20 overflow-y-scroll" : "hidden"}>
                {place?.reviews?.map((review) => {
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
          <table className="w-full mt-3 border-separate">
            <tr>
              <td>장소명test</td>
              <td>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Place Name"
                    className="w-full border-spacing-0 text-xs outline-none"
                    ref={placeNameRef}
                    value={placeNameValue}
                    onChange={handlePlaceName}
                    onFocus={handleFooter}
                    onBlur={handleFooter}
                  />
                  <div
                    className="w-28 flex justify-center text-xs bg-pink-200 shadow-md rounded-lg"
                    onClick={handleCopyNameFromMap}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                      />
                    </svg>
                    <div>From Map</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>평점</td>
              <td className="text-sm">
                <ul className="flex gap-2" ref={rateRef}>
                  <li className="text-main" id={1} onClick={handleRate}>
                    ★
                  </li>
                  <li className="text-main" id={2} onClick={handleRate}>
                    ★
                  </li>
                  <li className="text-main" id={3} onClick={handleRate}>
                    ★
                  </li>
                  <li className="text-main" id={4} onClick={handleRate}>
                    ☆
                  </li>
                  <li className="text-main" id={5} onClick={handleRate}>
                    ☆
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>타입</td>
              <td>
                <div className="flex gap-4 text-xs">
                  <div
                    className={`flex items-center ${
                      placeType === "Food"
                        ? "text-main font-bold"
                        : "text-gray-500"
                    } `}
                    onClick={() => {
                      setPlaceType("Food");
                    }}
                  >
                    {checkedIcon} Food
                  </div>
                  <div
                    className={`flex items-center ${
                      placeType === "Place"
                        ? "text-main font-bold"
                        : "text-gray-500"
                    } `}
                    onClick={() => {
                      setPlaceType("Place");
                    }}
                  >
                    {checkedIcon} Place
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>이미지</td>
              <td>
                <div className="flex items-center text-xs text-textBlack">
                  <input
                    type="file"
                    id="file"
                    className="h-4 hidden"
                    accept="image/*"
                    ref={fileRef}
                    onChange={test}
                    onFocus={handleFooter}
                    onBlur={handleFooter}
                  />
                  <label htmlFor="file" className="mr-1 text-main">
                    <AddPhotoAlternateRoundedIcon
                      style={{ fontSize: "1.2rem" }}
                    />
                  </label>
                  {fileName ? fileName : "No Image (use Google Image)"}
                </div>
              </td>
            </tr>
            <tr>
              <td>설명</td>
              <td>
                <textarea
                  cols="30"
                  rows="2"
                  placeholder="Description"
                  className="pt-1 resize-none outline-none text-xs w-full leading-tight"
                  ref={descriptionRef}
                  onFocus={handleFooter}
                  onBlur={handleFooter}
                />
              </td>
            </tr>
          </table>
          <SubmitCancelButton
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        </div>
        <ModalPreview />
      </div>
    </>
  );
};

export default ModalPlace;
