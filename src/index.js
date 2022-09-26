import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { PostsContextProvider } from "./context/PostsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </React.StrictMode>
  </Router>
);
