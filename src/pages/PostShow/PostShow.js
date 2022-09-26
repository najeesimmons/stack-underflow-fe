import { useParams } from "react-router-dom";
import { useState } from "react";
import "./PostShow.module.scss";
import Wrapper from "../../components/Wrapper/Wrapper";

const PostShow = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p._id === id);

  const [editForm, setEditForm] = useState(post);

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const updatePosts = async (post, id) => {
  //     await fetch(`${URL}posts/${id}`, {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(post),
  //     });
  //   };
  // };

  // const removePost = async (post._id) => {
  //   await fetch(`${URL}posts/${id}`, {
  //     method: "delete",
  //   });
  // };

  return (
    <Wrapper>
      <h2>{post.title}</h2>
      <p>{Date(post.publishDate)}</p>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <button id="delete">
      {/* onClick={removePost} */}
        DELETE
      </button>
      <form>
      {/* onSubmit={handleSubmit} */}
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