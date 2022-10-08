//from react
import { useState } from "react";
//react-router-dom
import { useParams, useNavigate } from "react-router-dom";
//custom hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const PostShow = ({ URL }) => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const { id } = useParams();
  const post = posts.find((p) => p._id === id);
  // rendering issues when there is no logged in user
  // const isUser = user._id === post.user_id;
  const [editForm, setEditForm] = useState(post);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleDelete = async () => {
    console.log(user);
    if (!user) {
      // throw Error
      console.log("You must be logged in to delete a post.");
      return;
    }

    if (!user._id === post.user_id) {
      //throw Error
      console.log("You're not authorized to delete this post.");
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
    <section className="post-show-container">
      <h2>{post.title}</h2>
      <p className="post-info">
        Asked{" "}
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <p>{post.user_id}</p>
      {user._id === post.user_id && (
        <button id="delete" onClick={handleDelete} className="button">
          Delete
        </button>
      )}
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
      </form>
    </section>
  );
};

export default PostShow;
