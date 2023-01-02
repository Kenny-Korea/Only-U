import React from "react";
import toongtoong from "../../Images/toongtoong.png";
import ProfileSmall from "../Profile/ProfileSmall";
import ModifyButton from "../Buttons/ModifyButton";

const PostCard = ({ post }) => {
  return (
    <>
      <div className="w-11/12 max-h-min card px-3 py-1.5 my-2 flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="font-bold text-xl">{post.title}</span>
          <ModifyButton />
        </div>
        <div className="flex justify-between">
          <ProfileSmall />
          {/* <span>{post.date}</span> */}
        </div>
        <div className="h-fit">
          <img
            src={toongtoong}
            alt="test"
            className="w-full object-cover h-fit"
          />
        </div>
        <div className="text-indigo-800 flex gap-2">
          {/* {post.hashTag[0]} */}
          {post.hashTag.map((item) => {
            return <div key={item}>#{item}</div>;
          })}
        </div>
        <div>{post.content}</div>
        <div>댓글 보기</div>
        <div>
          <ProfileSmall />
        </div>
      </div>
    </>
  );
};

export default PostCard;
