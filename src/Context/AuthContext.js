import { useEffect, createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [partnerInfo, setPartnerInfo] = useState({});

  useEffect(() => {
    const fetchPartnerInfo = async (data) => {
      const colRef = collection(db, "user");
      const q = query(colRef, where("partnerId", "==", data.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPartnerInfo(doc.data());
      });
    };
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      fetchPartnerInfo(user);
    });

    // useEffect 사용 시, return 문을 활용한 cleanup 함수를 사용하지 않으면
    // 메모리 누수가 발생함
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, partnerInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
