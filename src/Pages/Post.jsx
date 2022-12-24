import React from "react";
import AddPostButton from "../Components/Buttons/AddPostButton";
import PostCard from "../Components/Cards/PostCard";

const Post = ({ size }) => {
  const test = [1, 2, 3];
  return (
    <>
      <div
        className={`${size} bg-lime-50 relative flex flex-col justify-center items-center`}
      >
        {test.map((post) => {
          return <PostCard />;
        })}

        <AddPostButton />
      </div>
    </>
  );
};

export default Post;
