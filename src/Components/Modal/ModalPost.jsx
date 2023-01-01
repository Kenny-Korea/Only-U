import React, { useRef, useState } from "react";
import "../../App.css";

const ModalPost = ({ post, setPost }) => {
  const [hashtag, setHashtag] = useState(["test"]);
  const handleCancel = () => {
    setPost(false);
  };
  const hashtagRef = useRef();
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
  return (
    <>
      <div
        className="w-full mx-2 bg-orange-200"
        id={post ? "addPostSlideIn" : "addPostSlideOut"}
        // id={post && "addPostSlideIn"}
      >
        <div className="flex flex-col">
          <span>포스트 작성</span>
          <span>Title</span>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="input"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="태그할 내용을 입력하세요"
              className="input"
              ref={hashtagRef}
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
          />
          <div className="flex justify-between mx-3 my-2">
            <button className="w-1/2 h-8 bg-slate-100">등록</button>
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
