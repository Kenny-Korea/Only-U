import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import Test from "./Components/Others/Test";
import Partner from "./Pages/Partner";

const App = () => {
  const screenSize = "w-screen h-screen";
  const pageSize = "w-screen h-full";
  const { currentUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("Home");
  const navigate = useNavigate();

  // 아래와 같이 recoil을 이용해 상태 관리하려고 하면 엄청 느려짐. 이유를 모르겠음
  // const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  // 로그인하지 않은 상태로 다른 페이지에 접근하는 것을 방지하기 위해 ProtectedRoute 선언 및 사용
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/Login" />;
    }
    return children;
  };

  useEffect(() => {
    window.addEventListener("popstate", () => {
      window.close();
    });
  }, []);

  return (
    <>
      <div className={`font-main ${screenSize} flex flex-col items-center`}>
        <Header />
        <div className="w-full h-[calc(100vh-4rem-70px)] bg-bgColor flex justify-center">
          {/* <div className="w-full bg-bgColor flex justify-center"> */}
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
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test size={pageSize} setCurrentPage={setCurrentPage} />
                </ProtectedRoute>
              }
            />
            <Route path="/Login" element={<Login size={pageSize} />} />
            <Route path="/Register" element={<Register size={pageSize} />} />
            <Route
              path="/Partner"
              element={
                <ProtectedRoute>
                  <Partner size={pageSize} />
                </ProtectedRoute>
              }
            />
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
