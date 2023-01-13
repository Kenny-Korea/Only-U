import React, { useContext, useRef, useState } from "react";
import ProfileImageSmall from "../Profile/ProfileImageSmall";
import { AuthContext } from "../../Context/AuthContext";
import "../../App.css";

const PostCard = ({ post, index }) => {
  const handleSettings = (e) => {
    // Update, Delete 기능 추가해야 함
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstTouchX, setFirstTouchX] = useState(0);
  const imageContainerRef = useRef();
  const { currentUser } = useContext(AuthContext);

  const toPrevImage = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? post.url.length - 1 : currentIndex - 1;
    if (isFirstSlide) {
      return;
    } else {
      imageContainerRef.current.style.transform = `translate(-${
        20 * (currentIndex - 1)
      }rem)`;
    }
    setCurrentIndex(newIndex);
  };
  const toNextImage = () => {
    const isLastSlide = currentIndex === post.url.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    if (isLastSlide) {
      return;
    } else {
      imageContainerRef.current.style.transform = `translate(-${
        20 * (currentIndex + 1)
      }rem)`;
    }
    setCurrentIndex(newIndex);
  };

  const onTouchStart = (e) => {
    setFirstTouchX(e.changedTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    const lastTouchX = e.changedTouches[0].clientX;
    const scrollX = firstTouchX - lastTouchX;
    if (scrollX < -30) {
      toPrevImage();
    } else if (scrollX > 30) {
      toNextImage();
    } else {
      return;
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full h-fit card my-2 flex flex-col gap-1">
          {post ? (
            <div
              className="min-w-full bg-transparent h-[26rem] overflow-x-hidden relative flex items-end"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {post?.url[1] ? (
                <div className="w-9 h-5 rounded-full bg-black opacity-50 text-[9px] text-center align-middle leading-5 text-white absolute top-2 left-2 z-10">
                  {currentIndex + 1} / {post.url.length}
                </div>
              ) : null}

              <img
                src={currentUser.photoURL}
                alt=""
                className="w-8 h-8 absolute object-cover top-2 right-2 rounded-full border border-gray-300"
              />

              <div className="absolute w-full h-1/3 max-h-[50%] bg-gradient-to-b from-transparent to-neutral-600 z-10 text-white flex flex-col justify-center p-3 gap-2 ">
                <span className="font-bold text-2xl leading-7">
                  {post?.title}
                </span>
                <div className="text-indigo-800 flex gap-2 text-sm">
                  {post?.hashTag.map((item) => {
                    return (
                      <div
                        className="h-5 w-fit px-2 text-white text-xs text-center rounded-full leading-5 border border-mainColor hashTag"
                        key={item}
                      >
                        #{item}
                      </div>
                    );
                  })}
                </div>
                <div className="text-xs">{post?.content}</div>
              </div>
              <div
                className={`w-[100rem] h-full flex duration-500`}
                ref={imageContainerRef}
              >
                {post?.url?.map((image) => {
                  return (
                    <div
                      style={{ backgroundImage: `url(${image})` }}
                      className="min-w-[20rem] w-full h-full bg-cover bg-no-repeat bg-center"
                    ></div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PostCard;
