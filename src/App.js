import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Plan from "./Pages/Plan";
import Shop from "./Pages/Shop";

const App = () => {
  const fullScreen = "w-screen h-screen";
  const hundred = "w-full h-full";
  return (
    <>
      <div className={`font-main relative ${hundred}`}>
        <Header children="홈" />
        <div className="absolute top-20">
          <Routes>
            <Route path="/" element={<Home size={fullScreen} />} />
            <Route path="/post" element={<Post size={fullScreen} />} />
            <Route path="/chat" element={<Chat size={fullScreen} />} />
            <Route path="/plan" element={<Plan size={fullScreen} />} />
            <Route path="/shop" element={<Shop size={fullScreen} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
