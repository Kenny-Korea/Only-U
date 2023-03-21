import React, { useState } from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ size }) => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // e.target.file은 1개, e.target.files는 여러개가 배열에 담기므로
    // 특정 파일을 선택하려면 배열의 몇 번째 요소인지 지정해줘야 함
    console.log(e.target[4].files[0]);
    const file = e.target[4].files[0];
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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
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
      <div className={`${size} pb-4 flex justify-center z-10`}>
        <div className="w-10/12">
          <div
            className={`card min-h-[26rem] ${err && "h-[28rem]"} flex flex-col`}
          >
            <form onSubmit={handleSubmit}>
              <ul className="m-4 flex flex-col gap-4 text-sm">
                <li className="flex flex-col">
                  <span>Username</span>
                  <input
                    type="text"
                    placeholder="username"
                    className="loginInput"
                  />
                </li>
                <li className="flex flex-col">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="Email"
                    className="loginInput"
                  />
                </li>
                <li className="flex flex-col">
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    className="loginInput"
                  />
                </li>
                <li className="flex flex-col">
                  <span>Password Check</span>
                  <input
                    type="password"
                    placeholder="Password Check"
                    className="loginInput"
                  />
                </li>
              </ul>
              <div className="w-auto h-8 m-4 flex flex-col items-center gap-2">
                {err && (
                  <span className="text-sm">
                    Something went wrong. Try again
                  </span>
                )}
                <div className="w-full h-full py-1 flex justify-center items-center text-white text-lg font-bold bg-orange-300 rounded-full">
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    className="w-full hidden"
                  />
                  <label
                    htmlFor="file"
                    className="w-full flex justify-center items-center gap-2"
                  >
                    <AccountBoxRoundedIcon style={{ fontSize: "1.3rem" }} />
                    Add my picture
                  </label>
                </div>
                <button
                  className="w-full h-full py-1 text-white text-lg font-bold bg-main hover:bg-mainColor rounded-full"
                  // type="submit"
                  // onClick={handleSubmit}
                >
                  Register
                </button>

                <p className="text-sm">
                  Do you have an account?{" "}
                  <Link
                    to="/Login"
                    className="text-mainColor font-bold underline underline-offset-4"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
            {/* <form onSubmit={handleTest}>
          <input type="file" />
          <button>Upload Test</button>
        </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
