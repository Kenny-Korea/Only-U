import React, { useRef, useState } from "react";
import ProfileImageSmall from "../Profile/ProfileImageSmall";
import ModifyButton from "../Buttons/ModifyButton";
import { Slideshow } from "@mui/icons-material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";

const PostCard = ({ post, index }) => {
  const handleSettings = (e) => {
    // Update, Delete 기능 추가해야 함
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageContainerRef = useRef();

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

  const [isClicked, setIsClicked] = useState(false);

  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);

  const onMouseDown = (e) => {
    setIsClicked(true);
    setMouseDownClientX(e.clientX);
    console.log(e.clientX);
  };
  const onMouseLeave = (e) => {
    setIsClicked(false);
  };
  const onMouseMove = (e) => {
    if (!isClicked) return;
    e.preventDefault();
    setMouseUpClientX(e.clientX);
  };
  const onMouseUp = (e) => {
    setIsClicked(false);
    const imgX = mouseUpClientX - mouseDownClientX;
    console.log(mouseUpClientX, mouseDownClientX);
    if (imgX > 30) {
      toPrevImage();
      console.log("next");
    } else if (imgX < -30) {
      console.log("prev");
      toNextImage();
    } else {
      return;
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-11/12 h-fit card px-3 py-1.5 my-2 flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-bold text-xl">{post?.title}</span>
            <div onClick={handleSettings}>
              <ModifyButton post={post} index={index} />
            </div>
          </div>
          <div className="flex justify-between">
            <ProfileImageSmall />
            <span>Kenny Kim</span>
            {/* <span>{post.date}</span> */}
          </div>
          {post?.url && (
            <div
              className="w-80 h-60 overflow-x-hidden relative"
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              <div
                className="w-10 h-10 centerItem absolute top-[6.25rem] left-1 z-10 rounded-full bg-slate-500 opacity-50"
                onClick={toPrevImage}
              >
                <KeyboardArrowLeftRoundedIcon
                  style={{ fontSize: "2rem", color: "white" }}
                />
              </div>
              <KeyboardArrowRightRoundedIcon
                onClick={toNextImage}
                className="absolute top-[40%] right-1 z-10"
              />
              <div
                className={`w-[100rem] h-60 flex duration-500`}
                ref={imageContainerRef}
              >
                {post?.url?.map((image) => {
                  return (
                    <div
                      style={{ backgroundImage: `url(${image})` }}
                      className="w-80 h-60 bg-cover bg-center"
                    ></div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="text-indigo-800 flex gap-2">
            {post?.hashTag.map((item) => {
              return <div key={item}>#{item}</div>;
            })}
          </div>
          <div className="text-xs">{post?.content}</div>
          <div className="text-xs text-gray-500">댓글 보기</div>
          <div className="flex gap-2 items-center">
            <ProfileImageSmall />
            <textarea
              cols="30"
              rows="2"
              placeholder="댓글 추가..."
              className="w-full ml-2 px-2 py-1 text-xs outline-none shadow-inner caret-textPink"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
