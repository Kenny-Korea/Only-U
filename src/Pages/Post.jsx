import React, { useState, useEffect, useContext } from "react";
import AddButton from "../Components/Buttons/AddButton";
import PostCard from "../Components/Cards/PostCard";
import ModalPost from "../Components/Modal/ModalPost";
import { onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const Post = ({ size, setTitle }) => {
  setTitle("Post");
  const [addPost, setAddPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = () => {
      const unsub = onSnapshot(
        doc(db, "posts", currentUser.uid),
        (snapshot) => {
          setPosts(snapshot.data().post);
        }
      );
      // clean-up
      return () => {
        unsub();
      };
    };
    currentUser.uid && getPosts();
  }, [currentUser.uid]);
  return (
    <>
      <div className={`${size}`}>
        {posts?.map((post, index) => {
          return <PostCard key={addPost + index} post={post} />;
        })}
        {Array.isArray(posts) && posts.length === 0
          ? "새 글을 작성해보세요"
          : null}
        <AddButton page="post" addPost={addPost} setAddPost={setAddPost} />
        <ModalPost addPost={addPost} setAddPost={setAddPost} />
      </div>
    </>
  );
};

export default Post;
