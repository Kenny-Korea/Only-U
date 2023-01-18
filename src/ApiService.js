import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { useQuery } from "react-query";

export function getData() {
  // const { currentUser } = useContext(AuthContext);
  // const onSuccess = (data) => {
  //   console.log("Perform side effect after data fetching", data);
  // };
  // const onError = (error) => {
  //   console.log("Perform side effect after encountering error", error);
  // };
  // const getPosts = () => {
  //   if (!currentUser?.uid) return;
  //   onSnapshot(doc(db, "posts", currentUser.uid), (snapshot) => {
  //     setPosts(snapshot.data().post);
  //   });
  // };
  // const { isLoading, data, isError, error, isFetching } = useQuery(
  //   "post",
  //   getPosts,
  //   onSuccess,
  //   onError
  // );
  // if (isLoading || isFetching) {
  //   return <h2>Loading...</h2>;
  // }
  // if (isError) {
  //   return <h2>{error.message}</h2>;
  // }
}
