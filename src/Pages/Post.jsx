import React, { useState } from "react";
import AddButton from "../Components/Buttons/AddButton";
import PostCard from "../Components/Cards/PostCard";
import ModalPost from "../Components/Modal/ModalPost";
import ModalSettings from "../Components/Modal/ModalSettings";

const Post = ({ size, setTitle }) => {
  const [post, setPost] = useState(false);

  setTitle("Post");
  const test = [1, 2, 3];
  return (
    <>
      <div className={`${size} page centerPage relative`}>
        {test.map((post, index) => {
          return <PostCard key={post + index} />;
        })}
        <AddButton page="post" post={post} setPost={setPost} />
        <ModalPost post={post} setPost={setPost} />
      </div>
    </>
  );
};

export default Post;
