//from react
import { useState, useEffect } from "react";
//react-router-dom
import { useParams, useNavigate } from "react-router-dom";
//custom hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { UPDATE_POST } from "../../context/PostsContext";

const PostShow = ({ URL }) => {
  const { dispatch, posts } = usePostsContext();
  const { user } = useAuthContext();

  const { id } = useParams();
  const postFromState = posts.find((post) => post._id === id);

  const [post, setPost] = useState(postFromState ?? null);
  const [editForm, setEditForm] = useState(postFromState ?? null);
  const [isEditing, setIsEditing] = useState(false);
  const isUser = user?._id === post?.user_id;

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = "white";
    const getPost = async () => {
      const response = await fetch(`${URL}posts/${id}`);
      const data = await response.json();

      setPost(data);
      setEditForm(data);
    };
    if (!postFromState) {
      getPost();
    }
  }, [URL, id, postFromState]);

  useEffect(() => {
    if (postFromState) {
      setPost(postFromState);
      setEditForm(postFromState)
    }
  }, [postFromState]);

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
      dispatch({ type: "DELETE_POST", payload: data });
    }
    navigate("/");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!user) {
      // throw Error
      console.log("You must be logged in to delete a post.");
      return;
    }

    if (!isUser) {
      //throw Error
      console.log("You're not authorized to delete this post.");
      return;
    }

    const response = await fetch(`${URL}posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(editForm),
    });

    const data = await response.json();
    console.log("response:", response.ok);
    if (response.ok) {
      dispatch({ type: UPDATE_POST, payload: data });
    }
  };

  if (!post) {
    return <h1>Loading</h1>;
  }

  return (
    <section className="post-show-container">
      <h2>{post.title}</h2>
      <p className="post-info">
        Asked{" "}
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <p>{post.user_id}</p>
      {isUser && (
        <>
          <button id="delete" onClick={handleDelete} className="button">
            Delete
          </button>
          <button
            id="edit"
            onClick={() => setIsEditing(!isEditing)}
            className="button"
          >
            Edit
          </button>
          {isEditing && (
            <form onSubmit={handleEdit}>
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
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default PostShow;
