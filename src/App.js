import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Place from "./Pages/Place";
import Gift from "./Pages/Gift";
import Register from "./Pages/Register";
import { useState } from "react";
// import GoogleMapTest1 from "./Components/Write/GoogleMapTest1";
// import GoogleMapTest2 from "./Components/Write/GoogleMapTest2";
import GoogleMapTest3 from "./Components/Write/GoogleMapTest3";
import { AuthContext } from "./Context/AuthContext";
import Login from "./Pages/Login";

const App = () => {
  // Header Title 변경을 위한 state
  const [title, setTitle] = useState("Home");
  const screenSize = "w-screen h-screen";
  const fullSize = "w-full h-full";
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <div className={`font-main relative ${fullSize}`}>
        <Header children={title} />
        <div className="absolute top-16">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home size={screenSize} setTitle={setTitle} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post"
              element={
                <ProtectedRoute>
                  <Post size={"w-screen h-full"} setTitle={setTitle} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat size={"w-screen h-full"} setTitle={setTitle} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/place"
              element={
                <ProtectedRoute>
                  <Place size={"w-screen h-full"} setTitle={setTitle} />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/gift"
              element={<Gift size={screenSize} setTitle={setTitle} />}
            /> */}
            <Route
              path="/register"
              element={<Register size={screenSize} setTitle={setTitle} />}
            />
            <Route
              path="/login"
              element={<Login size={screenSize} setTitle={setTitle} />}
            />
            {/* <Route
              path="/test1"
              element={<GoogleMapTest1 size={screenSize} setTitle={setTitle} />}
            /> */}
            {/* <Route
              path="/test2"
              element={<GoogleMapTest2 size={screenSize} setTitle={setTitle} />}
            /> */}
            <Route
              path="/gift"
              element={<GoogleMapTest3 size={screenSize} setTitle={setTitle} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
