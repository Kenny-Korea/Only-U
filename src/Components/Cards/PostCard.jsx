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
        <div className="text-indigo-800">#롯데월드 #아바타 #첫 데이트</div>
        <div>
          오늘 퉁퉁이랑 처음으로 영화를 봤다! 아바타는 너무 재밌었고, 퉁퉁이는
          너무 귀여웠다 ㅋㅋㅋ
        </div>
        <div>댓글 보기</div>
        <div>
          <ProfileSmall />
        </div>
      </div>
    </>
  );
};

export default PostCard;
