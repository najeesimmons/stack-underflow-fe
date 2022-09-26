//from react
import { Routes, Route } from "react-router-dom";

// components
import Home from "./pages/Home/Home";
import PostShow from "./pages/PostShow/PostShow";
import Nav from "./components/Nav/Nav";
import PostForm from "./pages/PostForm/PostForm";
//styles
import "./App.scss";

function App() {
  const URL = "http://localhost:4000/";

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home URL={URL} />} />
        <Route path="/post/:id" element={<PostShow URL={URL} />} />
        <Route path="/new" element={<PostForm URL={URL} />} />
      </Routes>
    </div>
  );
}

export default App;
