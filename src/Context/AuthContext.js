import { useEffect, createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // useEffect 사용 시, return 문을 활용한 cleanup 함수를 사용하지 않으면
    // 메모리 누수가 발생함
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
