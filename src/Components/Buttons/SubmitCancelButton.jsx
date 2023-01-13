import React from "react";

const SubmitCancelButton = ({ handleSubmit, handleCancel }) => {
  return (
    <>
      <div className="flex justify-between gap-4 mx-3 my-2">
        <button
          className="w-1/2 h-8 bg-main text-white rounded-md"
          onClick={handleSubmit}
        >
          등록
        </button>
        <button
          className="w-1/2 h-8 bg-slate-300 rounded-md"
          onClick={handleCancel}
        >
          취소
        </button>
      </div>
    </>
  );
};

export default SubmitCancelButton;
