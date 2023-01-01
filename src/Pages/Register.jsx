import React, { useState } from "react";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleTest = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const storageRef = ref(storage, "a.png");
    try {
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log("pressed");
      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log(`Upload is ${progress}% done`);
      //   },
      //   (error) => {
      //     alert(`error: image upload error ${JSON.stringify(error)}`);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
      //       console.log(`완료 url: ${downloadUrl}`);
      //     });
      //   }
      // );
    } catch {
      console.log("failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // e.target.file은 1개, e.target.files는 여러개가 배열에 담기므로
    // 특정 파일을 선택하려면 배열의 몇 번째 요소인지 지정해줘야 함
    const file = e.target[3].files[0];
    try {
      // 유저 계정 생성
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // navigate("/");

      // 두 번째 인자를 이름으로 이미지가 저장됨
      const storageRef = ref(storage, username);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          // console.log("phase1");
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              username,
              photoURL: downloadURL,
            });
            // console.log("phase2");
            await setDoc(doc(db, "user", res.user.uid), {
              uid: res.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });
            // console.log("phase3");
            // await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <div className="page">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col w-screen gap-4">
          <input type="text" placeholder="username" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          {/* <input
            type="password"
            placeholder="Password Check"
            className="input"
          /> */}
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <PortraitRoundedIcon />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong. Try again</span>}
        </form>
        <form onSubmit={handleTest}>
          <input type="file" />
          <button>Upload Test</button>
        </form>
      </div>
    </>
  );
};

export default Register;
