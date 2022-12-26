import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Plan from "./Pages/Plan";
import Gift from "./Pages/Gift";
import { useState } from "react";

const App = () => {
  // Header Title 변경을 위한 state
  const [title, setTitle] = useState("Home");
  const fullScreen = "w-screen h-screen";
  const hundred = "w-full h-full";

  return (
    <>
      <div className={`font-main relative ${hundred}`}>
        <Header children={title} />
        <div className="absolute top-20">
          <Routes>
            <Route
              path="/"
              element={<Home size={fullScreen} setTitle={setTitle} />}
            />
            <Route
              path="/post"
              element={<Post size={fullScreen} setTitle={setTitle} />}
            />
            <Route
              path="/chat"
              element={<Chat size={fullScreen} setTitle={setTitle} />}
            />
            <Route
              path="/plan"
              element={<Plan size={fullScreen} setTitle={setTitle} />}
            />
            <Route
              path="/gift"
              element={<Gift size={fullScreen} setTitle={setTitle} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
