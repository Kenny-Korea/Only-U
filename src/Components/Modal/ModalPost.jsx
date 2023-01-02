import React, { useRef, useState } from "react";
import "../../App.css";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";

const ModalPost = ({ addPost, setAddPost }) => {
  const { currentUser } = useContext(AuthContext);
  const titleRef = useRef();
  const contentRef = useRef();
  const hashtagRef = useRef();
  const [hashtag, setHashtag] = useState([]);
  // const { data } = useContext(ChatContext);

  const handleAddHashtag = () => {
    if (hashtagRef.current.value === "") return;
    let copy = [...hashtag];
    copy.push(hashtagRef.current.value);
    setHashtag(copy);
    hashtagRef.current.value = "";
  };

  const handleRemoveHashtag = (item) => {
    setHashtag(
      hashtag.filter((tag) => {
        return tag !== item;
      })
    );
  };

  const handleEnter = (e) => {
    e.code === "Enter" && handleAddHashtag();
  };

  const handleSubmit = async () => {
    const res = await getDoc(doc(db, "posts", currentUser.uid));
    const docRef = doc(db, "posts", currentUser.uid);
    const post = {
      id: uuid(),
      title: titleRef.current.value,
      hashTag: hashtag,
      content: contentRef.current.value,
      writer: currentUser.uid,
      // Timestamp 잘못 사용해서 계속 오류났음 ㅠㅠ
      date: Timestamp.now(),
    };
    const handleUpdate = async (type) => {
      try {
        await type(docRef, {
          post: arrayUnion(post),
        }).then(() => {
          setAddPost(false);
        });
      } catch {
        console.log("err");
      }
    };
    if (!res.exists()) {
      handleUpdate(setDoc);
    } else {
      handleUpdate(updateDoc);
    }
  };

  const handleCancel = () => {
    setAddPost(false);
  };

  return (
    <>
      <div
        className="w-full mx-2 bg-orange-200"
        id={addPost ? "addPostSlideIn" : "addPostSlideOut"}
        // id={post && "addPostSlideIn"}
      >
        <div className="flex flex-col">
          <span>포스트 작성</span>
          <span>Title</span>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="input"
            ref={titleRef}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="태그할 내용을 입력하세요"
              className="input"
              ref={hashtagRef}
              onKeyDown={handleEnter}
            />
            <button className="w-10 bg-slate-300" onClick={handleAddHashtag}>
              추가
            </button>
          </div>
          <div className="w-full bg-white flex gap-2">
            {hashtag.map((item, index) => {
              return (
                <span
                  key={item + index}
                  onClick={() => {
                    handleRemoveHashtag(item);
                  }}
                >
                  #{item}
                </span>
              );
            })}
          </div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="내용을 입력하세요"
            className="mx-3 my-2 px-2 py-1 resize-none outline-none"
            ref={contentRef}
          />
          <div className="flex justify-between mx-3 my-2">
            <button className="w-1/2 h-8 bg-slate-100" onClick={handleSubmit}>
              등록
            </button>
            <button className="w-1/2 h-8 bg-pink-100" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPost;
