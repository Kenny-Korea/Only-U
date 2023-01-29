import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRef } from "react";

const Login = ({ size }) => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const savedEmail = localStorage.getItem("email");
  const handleSaveEmail = (e) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      localStorage.setItem("email", emailRef.current.value);
    } else {
      localStorage.removeItem("email");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  const handleTestAccount = () => {
    const inputRef = document.querySelectorAll("input");
    console.log(inputRef.current);
  };
  return (
    <>
      <div className={`${size} pb-4 flex justify-center z-10`}>
        <div className="w-10/12">
          <div
            className={`card min-h-[15rem] h-80 ${err && "h-72"} flex flex-col`}
          >
            <form onSubmit={handleSubmit}>
              <ul className="m-4 flex flex-col gap-4 text-sm">
                <li className="flex flex-col">
                  <span>Email</span>
                  <input
                    className="loginInput"
                    type="email"
                    placeholder={savedEmail ? savedEmail : "email"}
                    ref={emailRef}
                  />
                </li>
                <li className="flex flex-col">
                  <span>Password</span>
                  <input
                    className="loginInput"
                    type="password"
                    placeholder="password"
                  />
                </li>
              </ul>

              <div className="w-auto h-8 m-4 flex flex-col items-center gap-2">
                {err && (
                  <span className="text-sm">
                    Something went wrong. Try again
                  </span>
                )}
                <div>
                  {/* save email
                  <input type="checkbox" onChange={handleSaveEmail} /> */}
                </div>
                <button className="w-full h-full py-1 text-white text-lg font-bold bg-main hover:bg-mainColor rounded-full">
                  Login
                </button>
                <p className="text-sm">
                  You don't have an account?{" "}
                  <Link
                    to="/Register"
                    className="text-mainColor font-bold underline underline-offset-4"
                  >
                    Register
                  </Link>
                </p>
                <div
                  className="w-full h-full py-1 flex justify-center text-white text-lg font-bold bg-yellow-400 hover:bg-mainColor rounded-full"
                  onClick={handleTestAccount}
                >
                  ★★★★ 테스트 계정 사용 ★★★★
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
