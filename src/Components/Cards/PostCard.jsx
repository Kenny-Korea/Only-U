import React from "react";
import unnamed from "../../Images/unnamed.png";
import toongtoong from "../../Images/toongtoong.png";
import ProfileSmall from "../Profile/ProfileSmall";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ModifyButton from "../Buttons/ModifyButton";

const PostCard = () => {
  return (
    <>
      <div className="w-11/12 card px-3 py-1.5 my-2 flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="font-bold text-xl">
            퉁퉁이랑 처음으로 영화 본 날
          </span>
          <ModifyButton />
        </div>
        <div className="flex justify-between">
          <ProfileSmall />
          <span>2022/08/12</span>
        </div>
        <div className="h-fit">
          <img
            src={toongtoong}
            alt="test"
            className="w-full object-cover h-fit"
          />
        </div>
        <div>오늘은 퉁퉁이와 함께 영화를 봤다. 정말 즐거운 하루였다 ㅎㅎㅎ</div>
      </div>
    </>
  );
};

export default PostCard;
