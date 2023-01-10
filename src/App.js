import React, { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Place from "./Pages/Place";
// import Gift from "./Pages/Gift";
import Register from "./Pages/Register";
import GoogleMapTest3 from "./Components/Write/GoogleMapTest3";
import { AuthContext } from "./Context/AuthContext";
import Login from "./Pages/Login";

const App = () => {
  const screenSize = "w-screen h-screen";
  const pageSize = "w-screen h-full";
  const { currentUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("Home");
  // 아래와 같이 recoil을 이용해 상태 관리하려고 하면 엄청 느려짐. 이유를 모르겠음
  // const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  // 로그인하지 않은 상태로 다른 페이지에 접근하는 것을 방지하기 위해 ProtectedRoute 선언 및 사용
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <div className={`font-main ${screenSize} flex flex-col`}>
        <Header />
        <div className="w-full h-[calc(100vh-3.5rem-70px)] bg-bgColor">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home size={pageSize} setCurrentPage={setCurrentPage} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post"
              element={
                <ProtectedRoute>
                  <Post size={pageSize} setCurrentPage={setCurrentPage} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat size={pageSize} setCurrentPage={setCurrentPage} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/place"
              element={
                <ProtectedRoute>
                  <Place size={pageSize} setCurrentPage={setCurrentPage} />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/gift"
              element={<Gift size={screenSize} />}
            /> */}
            <Route path="/register" element={<Register size={screenSize} />} />
            <Route path="/login" element={<Login size={screenSize} />} />
            <Route
              path="/gift"
              element={
                <GoogleMapTest3
                  size={screenSize}
                  setCurrentPage={setCurrentPage}
                />
              }
            />
          </Routes>
        </div>
        <Footer currentPage={currentPage} />
      </div>
    </>
  );
};

export default App;
