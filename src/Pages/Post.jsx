import React from "react";
import AddButton from "../Components/Buttons/AddButton";
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
        <AddButton page="post" />
      </div>
    </>
  );
};

export default Post;
