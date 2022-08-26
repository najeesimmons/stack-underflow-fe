import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import PostShow from "./pages/PostShow/PostShow";
import Nav from "./components/Nav/Nav";
import NewPostForm from "./pages/NewPostForm/NewPostForm";

function App() {
  const URL = "http://localhost:4000/";
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch(`${URL} + posts/`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPosts = async (post) => {
    try {
      await fetch(`${URL} + posts/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
        getPosts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getPosts, []);

  const updatePosts = async (post, id) => {
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    getPosts();
  };

  const deletePosts = async (id) => {
    await fetch(URL + id, {
      method: "delete",
    });
    getPosts();
  };

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home posts={posts} />} />
        <Route
          path="/post/:id"
          element={
            <PostShow
              posts={posts}
              updatePosts={updatePosts}
              deletePosts={deletePosts}
            />
          }
        />
        <Route
          path="/new"
          element={<NewPostForm createPosts={createPosts} />}
        />
      </Routes>
    </div>
  );
}

export default App;
