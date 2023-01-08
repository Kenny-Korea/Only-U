import React, { useState } from "react";
import ProfileImageSmall from "../Profile/ProfileImageSmall";
import ModifyButton from "../Buttons/ModifyButton";

const PostCard = ({ post, index }) => {
  const handleSettings = (e) => {
    // Update, Delete 기능 추가해야 함
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
          <div className="h-fit">
            {Array.isArray(post?.url) && post.url.length === 0
              ? null
              : post?.url.map((img, index) => {
                  return (
                    <img
                      src={img}
                      key={img + index}
                      alt="test"
                      className="w-full object-cover"
                    />
                  );
                })}
          </div>
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
