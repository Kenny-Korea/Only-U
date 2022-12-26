import React from "react";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";

const Register = () => {
  const handleSubmit = () => {
    console.log("test");
  };
  return (
    <>
      <div className="page">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col w-screen gap-4">
          <input type="text" placeholder="Username" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <input
            type="password"
            placeholder="Password Check"
            className="input"
          />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <PortraitRoundedIcon />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
      </div>
    </>
  );
};

export default Register;
