//from react
import { useState } from "react";
//react-router-dom
import { useParams, useNavigate } from "react-router-dom";
//components
import Wrapper from "../../components/Wrapper/Wrapper";
//custom hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
//styles
import "./PostShow.module.scss";

const PostShow = ({ URL }) => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const { id } = useParams();
  const post = posts.find((p) => p._id === id);
  const [editForm, setEditForm] = useState(post);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    if (user._id !== post.user_id) {
      return;
    }

    const response = await fetch(`${URL}posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
    navigate("/");
  };

  return (
    <Wrapper>
      <h2>{post.title}</h2>
      <p>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <p>{post.user_id}</p>
      <button id="delete" onClick={handleDelete}>
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
      </form>
    </Wrapper>
  );
};

export default PostShow;
