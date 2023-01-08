import React, { useRef, useState } from "react";
import { useQuery } from "react-query";

import ChatInput from "../Components/Inputs/ChatInput";
import ChatProfile from "../Components/Profile/ChatProfile";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Messages from "../Components/Message/Messages";

const Chat = ({ size }) => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const divRef = useRef();

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const getChats = () => {
    if (!currentUser?.uid) return;
    onSnapshot(doc(db, "chat", currentUser.uid), (snapshot) => {
      setMessages(snapshot.data().chat);
    });
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    "post",
    getChats,
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "chat", currentUser.uid), (doc) => {
  //       setMessages(doc.data().chat);
  //     });
  //     // Clean-Up 함수
  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  //   // divRef.current.lastChild.scrollIntoView();
  //   console.log(divRef.current.lastChild);
  // }, [currentUser.uid]);

  return (
    <>
      {/* background */}
      <div
        className={`w-screen h-[calc(100vh-7.5rem)] bg-green-200 flex flex-col mb-16 centerPage`}
      >
        <ChatProfile />
        <Messages messages={messages} divRef={divRef} />
        <ChatInput />
      </div>
    </>
  );
};

export default Chat;
