import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Place from "./Pages/Place";
// import Gift from "./Pages/Gift";
import Register from "./Pages/Register";
// import GoogleMapTest1 from "./Components/Write/GoogleMapTest1";
// import GoogleMapTest2 from "./Components/Write/GoogleMapTest2";
import GoogleMapTest3 from "./Components/Write/GoogleMapTest3";
import { AuthContext } from "./Context/AuthContext";
import Login from "./Pages/Login";

const App = () => {
  const screenSize = "w-screen h-screen";
  const pageSize = "w-screen h-full";
  const { currentUser } = useContext(AuthContext);
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
        <div className="w-full h-[calc(100vh-7.5rem)] bg-white">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home size={pageSize} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post"
              element={
                <ProtectedRoute>
                  <Post size={pageSize} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat size={pageSize} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/place"
              element={
                <ProtectedRoute>
                  <Place size={pageSize} />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/gift"
              element={<Gift size={screenSize} />}
            /> */}
            <Route path="/register" element={<Register size={screenSize} />} />
            <Route path="/login" element={<Login size={screenSize} />} />
            {/* <Route
              path="/test1"
              element={<GoogleMapTest1 size={screenSize} />}
            /> */}
            {/* <Route
              path="/test2"
              element={<GoogleMapTest2 size={screenSize} />}
            /> */}
            <Route
              path="/gift"
              element={<GoogleMapTest3 size={screenSize} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
