//from react
import { Routes, Route } from "react-router-dom";

// components
import Home from "./pages/Home/Home";
import PostShow from "./pages/PostShow/PostShow";
import Nav from "./components/Nav/Nav";
import NewPostForm from "./pages/NewPostForm/NewPostForm";
//styles
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostShow />} />
        <Route path="/new" element={<NewPostForm />} />
      </Routes>
    </div>
  );
}

export default App;
