import React from "react";

const RegularInput = ({ placeholder }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className="w-calc[100% - 2rem] h-10 mx-3 my-2 px-2 py-1 border-b-gray-40 border-b-2 outline-none"
      />
    </>
  );
};

export default RegularInput;
