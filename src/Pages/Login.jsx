import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRef } from "react";

const Login = () => {
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
  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={savedEmail ? savedEmail : "email"}
            ref={emailRef}
          />
          <input type="password" placeholder="password" />
          save email
          <input type="checkbox" onChange={handleSaveEmail} />
          <button>Sign In</button>
          {err && <span>Something went wrong. Try again</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
