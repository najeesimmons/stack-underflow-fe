//components
import { PostsContext } from "../context/PostsContext";
//from react
import { useContext } from "react";

export const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw Error("usePostsContext must be used inside of PostsContextProvider");
  }

  return context;
};
