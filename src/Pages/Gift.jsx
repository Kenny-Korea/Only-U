import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../atoms";

const Gift = ({ size, setCurrentPage }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  useEffect(() => {
    setCurrentPage("Gift");
    setHideFooter(false);
  }, []);
  return (
    <>
      <div className={`${size} page`}>Gift Page</div>
    </>
  );
};

export default Gift;
