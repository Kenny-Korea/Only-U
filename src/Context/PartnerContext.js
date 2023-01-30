import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

export const PartnerContext = createContext();

export const PartnerContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [partnerInfo, setPartnerInfo] = useState();
  // useEffect(() => {
  //   if (!currentUser) return;
  //   const fetchPartnerInfo = async () => {
  //     const colRef = collection(db, "user");
  //     const q = query(colRef, where("partnerId", "==", currentUser.uid));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setPartnerInfo(doc.data());
  //     });
  //   };
  //   fetchPartnerInfo();
  //   return () => {
  //     fetchPartnerInfo();
  //   };
  // }, [currentUser]);

  return (
    <PartnerContext.Provider value={{ partnerInfo }}>
      {children}
    </PartnerContext.Provider>
  );
};
