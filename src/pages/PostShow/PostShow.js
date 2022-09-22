import { useParams } from "react-router-dom";
import { useState } from "react";
import "./PostShow.module.scss";
import Wrapper from "../../components/Wrapper/Wrapper";

const PostShow = ({ posts, updatePosts, deletePosts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p._id === id);

  const [editForm, setEditForm] = useState(post);

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePosts(editForm, post._id);
    // props.history.push("/");
  };

  const removePost = () => {
    deletePosts(post._id);
    // props.history.push("/");
  };
  return (
    <Wrapper>
      <h2>{post.title}</h2>
      <p>{Date(post.publishDate)}</p>
      <p>{post.body}</p>
      <button id="delete" onClick={removePost}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.body}
          name="body"
          placeholder="body"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </Wrapper>
  );
};

export default PostShow;
