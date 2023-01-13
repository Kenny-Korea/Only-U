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
import AddRoundedIcon from "@mui/icons-material/AddRounded";

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

  const handleRemoveImage = (URL, index) => {
    let array = imagePreview.filter((item) => {
      return item !== URL;
    });
    setImagePreview(array);
    console.log(imageFile);
    let copy = [...imageFile];
    copy.splice(index, 1);
    setImageFile(copy);
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
      {addPost && (
        <div
          className="w-screen h-screen fixed top-0 left-0 z-10"
          id={addPost ? "fadeIn" : "fadeOut"}
        ></div>
      )}
      <div
        className="w-full h-screen fixed left-0 pt-14 itemCenter z-10"
        id={addPost ? "addPostSlideIn" : "addPostSlideOut"}
      >
        <div className="rounded-xl overflow-hidden shadow-md m-4 p-3 bg-bgColor">
          <div className="flex flex-col">
            <span className="w-full h-6 text-textBlack text-md flex justify-center items-center">
              포스트 작성
            </span>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <span className="px-1">제목</span>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="loginInput"
                  ref={titleRef}
                  onFocus={handleFooter}
                  onBlur={handleFooter}
                />
              </li>
              <li>
                <span className="px-1">태그</span>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="태그할 내용을 입력하세요"
                    className="loginInput"
                    ref={hashtagRef}
                    onKeyDown={handleEnter}
                    onFocus={handleFooter}
                    onBlur={handleFooter}
                  />
                  <button
                    className="w-7 h-7 bg-main text-white rounded-md centerItem"
                    onClick={handleAddHashtag}
                  >
                    <AddRoundedIcon
                      style={{ fontSize: "1.2rem", fontWeight: "900" }}
                    />
                  </button>
                </div>
              </li>
              <li>
                <span>이미지</span>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleAddImage}
                  multiple
                  ref={fileRef}
                />
                <div className="flex items-center gap-2">
                  <div className="w-full h-[3.2rem] bg-white flex px-2 gap-1 overflow-x-scroll rounded-md border border-gray-200">
                    {imagePreview?.map((imageURL, index) => {
                      return (
                        <img
                          src={imageURL}
                          alt="pp"
                          className="min-w-16 h-12 object-cover border-collapse border-r border-gray-200"
                          onClick={() => {
                            handleRemoveImage(imageURL, index);
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="w-7 h-7 bg-main rounded-lg flex justify-center items-center text-white">
                    <label htmlFor="file">
                      <AddRoundedIcon
                        style={{ fontSize: "1.2rem", fontWeight: "900" }}
                      />
                    </label>
                  </div>
                </div>
              </li>
              <li className="flex flex-col">
                <span>내용</span>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  placeholder="내용을 입력하세요"
                  className="textArea"
                  ref={contentRef}
                  onFocus={handleFooter}
                  onBlur={handleFooter}
                />
              </li>
            </ul>
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
