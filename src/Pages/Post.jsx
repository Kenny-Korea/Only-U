import React from "react";
import AddPostButton from "../Components/Buttons/AddPostButton";
import PostCard from "../Components/Cards/PostCard";

const Post = ({ size, setTitle }) => {
  setTitle("Post");
  const test = [1, 2, 3, 4];
  return (
    <>
      <div className={`${size} page centerPage`}>
        {test.map((post, index) => {
          return <PostCard key={post + index} />;
        })}

        <AddPostButton />
      </div>
    </>
  );
};

export default Post;
