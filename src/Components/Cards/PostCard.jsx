import React from "react";
import toongtoong from "../../Images/toongtoong.png";
import ProfileSmall from "../Profile/ProfileSmall";
import ModifyButton from "../Buttons/ModifyButton";

const PostCard = ({ post }) => {
  const handleSettings = () => {
    // Update, Delete 기능 추가해야 함
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-11/12 h-fit card px-3 py-1.5 my-2 flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-bold text-xl">{post.title}</span>
            <div onClick={handleSettings}>
              <ModifyButton />
            </div>
          </div>
          <div className="flex justify-between">
            <ProfileSmall />
            {/* <span>{post.date}</span> */}
          </div>
          <div className="h-fit">
            {Array.isArray(post.url) && post.url.length === 0
              ? null
              : post.url.map((img) => {
                  return (
                    <img src={img} alt="test" className="w-full object-cover" />
                  );
                })}
          </div>
          <div className="text-indigo-800 flex gap-2">
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
      </div>
    </>
  );
};

export default PostCard;
