// import { BrowserRouter, Routes, Route } from "react-router-dom";
import{ BrowserRouter, Routes, Route } from "react-router-dom"
// components
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PostForm from "./pages/PostForm/PostForm";
import PostShow from "./pages/PostShow/PostShow";
import Signup from "./pages/Signup/Signup";
import Nav from "./components/Nav/Nav";
//styles


function App() {
  const URL = "http://localhost:4000/";

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home URL={URL} />} />
          <Route path="/post/:id" element={<PostShow URL={URL} />} />
          <Route path="/new" element={<PostForm URL={URL} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
