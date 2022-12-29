import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Place from "./Pages/Place";
import Gift from "./Pages/Gift";
import Register from "./Pages/Register";
import { useState } from "react";
import AddButton from "./Components/Buttons/AddButton";
// import GoogleMapTest1 from "./Components/Write/GoogleMapTest1";
// import GoogleMapTest2 from "./Components/Write/GoogleMapTest2";
import GoogleMapTest3 from "./Components/Write/GoogleMapTest3";

const App = () => {
  // Header Title 변경을 위한 state
  const [title, setTitle] = useState("Home");
  const screenSize = "w-screen h-screen";
  const fullSize = "w-full h-full";

  return (
    <>
      <div className={`font-main relative ${fullSize}`}>
        <Header children={title} />
        <div className="absolute top-16">
          <Routes>
            <Route
              path="/"
              element={<Home size={screenSize} setTitle={setTitle} />}
            />
            <Route
              path="/post"
              element={<Post size={fullSize} setTitle={setTitle} />}
            />
            <Route
              path="/chat"
              element={<Chat size={screenSize} setTitle={setTitle} />}
            />
            <Route
              path="/place"
              element={<Place size={screenSize} setTitle={setTitle} />}
            />
            {/* <Route
              path="/gift"
              element={<Gift size={screenSize} setTitle={setTitle} />}
            /> */}
            <Route
              path="/register"
              element={<Register size={screenSize} setTitle={setTitle} />}
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
