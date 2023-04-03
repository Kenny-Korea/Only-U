import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Messages from "../Components/Message/Messages";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../atoms";
import { PartnerContext } from "../Context/PartnerContext";

const Chat = ({ size, setCurrentPage }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  const [messages, setMessages] = useState([]);
  const { currentUser, partnerInfo } = useContext(AuthContext);
  console.log(currentUser);

  const scrollToLatestMessage = () => {
    if (!divRef.current) return;
    divRef.current.scrollTo({
      top: divRef.current.scrollHeight,
      behavior: "instant",
    });
  };

  useEffect(() => {
    setCurrentPage("Chat");
    setHideFooter(false);
  }, []);

  useEffect(() => {
    scrollToLatestMessage();
  }, [messages]);
  // const { partnerInfo } = useContext(PartnerContext);
  const divRef = useRef();

  const getChats = () => {
    if (!partnerInfo) return;
    onSnapshot(doc(db, "chats", partnerInfo.combinedId), (snapshot) => {
      if (!snapshot.data()) return;
      setMessages(snapshot.data().chat);
      scrollToLatestMessage();
    });
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    "chats", // unique key
    getChats, // fetch function
    { enabled: Object.keys(partnerInfo).length !== 0 }
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
      <div className={`${size} flex justify-center z-10`}>
        <Messages messages={messages} divRef={divRef} />
      </div>
    </>
  );
};

export default Chat;
