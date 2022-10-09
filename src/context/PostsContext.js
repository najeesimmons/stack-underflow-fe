import { createContext, useReducer } from "react";

export const PostsContext = createContext();
export const UPDATE_POST = "UPDATE_POST"
//reducer handles different ways I'd want to mutate state
export const postsReducer = (state, action) => {
  console.log("action:", action)
  switch (action.type) {
    case "SET_POSTS":
      return {
        posts: action.payload,
      };
    case "CREATE_POST":
      return {
        posts: [action.payload, ...state.posts],
      };
    case "DELETE_POST":
      return {
        posts: state.posts.filter((p) => p._id !== action.payload._id),
      };
    case UPDATE_POST:
      {
        console.log("TESTING")
        const index = state.posts.findIndex((p) => p._id);
      state.posts.splice(index, 1, action.payload);
      return {
        posts: [...state.posts],
      };}
    default:
      return state;
  }
};

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: [],
  });

  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
