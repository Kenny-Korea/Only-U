import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import ChatInput from "../Components/Inputs/ChatInput";
import ChatProfile from "../Components/Profile/ChatProfile";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Messages from "../Components/Message/Messages";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../atoms";

const Chat = ({ size, setCurrentPage }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  useEffect(() => {
    setCurrentPage("Chat");
    setHideFooter(false);
  }, []);
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

  return (
    <>
      {/* background */}
      <div className={`${size} duration-500`}>
        <ChatProfile />
        <Messages messages={messages} divRef={divRef} />
        <ChatInput />
      </div>
    </>
  );
};

export default Chat;
