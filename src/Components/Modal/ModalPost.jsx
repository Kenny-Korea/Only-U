import React, { useRef, useState } from "react";
import "../../App.css";
import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { v4 as uuid } from "uuid";
import addAvatar from "../../Images/addAvatar.png";
import SubmitCancelButton from "../Buttons/SubmitCancelButton";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../../atoms";

const ModalPost = ({ addPost, setAddPost }) => {
  const { currentUser } = useContext(AuthContext);
  const titleRef = useRef();
  const contentRef = useRef();
  const hashtagRef = useRef();
  const [hashtag, setHashtag] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);

  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);

  const handleFooter = (e) => {
    setHideFooter(!hideFooter);
  };

  const handleAddHashtag = () => {
    if (hashtagRef.current.value === "") return;
    let copy = [...hashtag];
    copy.push(hashtagRef.current.value);
    setHashtag(copy);
    hashtagRef.current.value = "";
    hashtagRef.current.focus();
  };

  const handleRemoveHashtag = (item) => {
    setHashtag(
      hashtag.filter((tag) => {
        return tag !== item;
      })
    );
  };

  const handleAddImage = (e) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    const preview = [...e.target.files];
    const previewTemp = [];
    preview.forEach((item) => {
      previewTemp.push(URL.createObjectURL(item));
    });
    const file = [...e.target.files];
    setImageFile(imageFile.concat(file));
    setImagePreview(imagePreview.concat(previewTemp));
  };

  const handleRemoveImage = () => {
    console.log(imagePreview);
  };

  const handleEnter = (e) => {
    e.code === "Enter" && handleAddHashtag();
  };

  const handleCancel = () => {
    setAddPost(false);
    setImagePreview([]);
    setImageFile([]);
    setImageURL([]);
  };

  const handleSubmit = async () => {
    if (uploading) return;
    setUploading(true);
    const uploadDate = Timestamp.now();
    const res = await getDoc(doc(db, "posts", currentUser.uid));
    const docRef = doc(db, "posts", currentUser.uid);
    const urlArray = [];

    for (let i = 0; i < imageFile.length; i++) {
      const storageRef = ref(storage, currentUser.uid + uploadDate + i);
      const uploadTask = await uploadBytesResumable(storageRef, imageFile[i], {
        contentType: "image/jpeg",
      });
      console.log(uploadTask);
      await getDownloadURL(uploadTask.ref).then((url) => {
        urlArray.push(url);
      });
    }

    const post = {
      id: uuid(),
      title: titleRef.current.value,
      hashTag: hashtag,
      content: contentRef.current.value,
      url: urlArray,
      writer: currentUser.uid,
      date: uploadDate,
    };

    const handleUpdate = async (type) => {
      try {
        await type(docRef, {
          post: arrayUnion(post),
        }).then(() => {
          handleCancel();
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
    setUploading(false);
  };

  return (
    <>
      <div
        className="w-full h-[calc(100vh-7.5rem)] fixed mt-14 itemCenter bg-white bg-opacity-50 z-20"
        id={addPost ? "addPostSlideIn" : "addPostSlideOut"}
      >
        <div className="rounded-xl overflow-hidden shadow-md m-2 p-2 bg-slate-200">
          <div className="flex flex-col">
            <span className="mx-3">포스트 작성</span>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="input"
              ref={titleRef}
              onFocus={handleFooter}
              onBlur={handleFooter}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="태그할 내용을 입력하세요"
                className="input"
                ref={hashtagRef}
                onKeyDown={handleEnter}
                onFocus={handleFooter}
                onBlur={handleFooter}
              />
              <button
                className="w-10 h-6 bg-slate-300"
                onClick={handleAddHashtag}
              >
                추가
              </button>
            </div>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleAddImage}
              multiple
              ref={fileRef}
            />
            <div className="w-full flex gap-2 px-3">
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
            <label htmlFor="file" className="w-10 h-10">
              <img src={addAvatar} alt="pp" className="w-10 h-10" />
            </label>
            <div className="flex overflow-x-scroll">
              {imagePreview?.map((img) => {
                return (
                  <img
                    src={img}
                    alt="pp"
                    className="w-16 h-16 object-cover"
                    onClick={handleRemoveImage}
                  />
                );
              })}
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="내용을 입력하세요"
              className="textArea"
              ref={contentRef}
              onFocus={handleFooter}
              onBlur={handleFooter}
            />
            <SubmitCancelButton
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPost;
