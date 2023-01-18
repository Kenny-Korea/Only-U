import React from "react";

const ModalRemoveNotif = ({ addDday }) => {
  return (
    <>
      {addDday && (
        <div
          className="w-screen h-screen fixed top-0 left-0 z-10"
          id={addDday ? "fadeIn" : "fadeOut"}
        ></div>
      )}
      <div
        className="w-full h-screen fixed left-0 pt-14 itemCenter z-10"
        id={addDday ? "addPostSlideIn" : "addPostSlideOut"}
      >
        <div className="rounded-xl overflow-hidden shadow-md m-4 p-3 bg-bgColor">
          <div className="flex flex-col">
            <span className="w-full h-6 text-textBlack text-md flex justify-center items-center">
              정말 삭제하시겠습니까?
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalRemoveNotif;
