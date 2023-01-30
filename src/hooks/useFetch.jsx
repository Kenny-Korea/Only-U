import { useQuery } from "react-query";

const getChats = () => {
  // if (!partnerInfo) return;
  // onSnapshot(doc(db, "chat", partnerInfo.combinedId), (snapshot) => {
  //   if (!snapshot.data()) return;
  //   setMessages(snapshot.data().chat);
  //   console.log("get message");
  //   // divRef.current.scrollIntoView(false);
  // });
};

export const useFetch = (key, getData) => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    key, // unique key
    getData // fetch function
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return { isLoading, isError, isFetching };
};
