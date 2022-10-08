//react
import { useState, useEffect } from "react";
//react-router-dom
import { useNavigate } from "react-router-dom";
//custom hook
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
//packages
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//styles
import "../../index.scss";

const NewPostForm = ({ URL }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const [newForm, setNewForm] = useState({
    title: "",
    body: "",
    comments: [],
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    document.body.style.background = "#e6e6e6";
  });

  const handleChange = (event) => {
    setNewForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditorChange = (content) => {
    setNewForm((prevForm) => ({ ...prevForm, body: content }));
  };

  const handleValidation = () => {
    const errors = [];
    if (!newForm.title) {
      errors.push("title");
    }
    if (!newForm.body) {
      errors.push("body");
    }
    setEmptyFields(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const hasErrors = handleValidation();
    if (hasErrors.length > 0) {
      return;
    }

    const response = await fetch(`${URL}posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newForm),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      setNewForm({
        title: "",
        body: "",
        comments: [],
      });
      dispatch({ type: "CREATE_POSTS", payload: data });
      navigate("/");
    }
  };

  return (
    <section className="question-container">
      <h3>Ask a public question</h3>
      <form onSubmit={handleSubmit} className="form-style">
        <label>Title</label>
        <p className="question-quicktips">
          Be specific and imagine you’re asking a question to another person
        </p>
        <input
          className={emptyFields.includes("title") ? "error" : "input"}
          type="text"
          value={newForm.title}
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <label>Body</label>
        <p>
          Include all the information someone would need to answer your question
        </p>
        <ReactQuill
          className={emptyFields.includes("body") ? "error" : ""}
          value={newForm.body}
          onChange={handleEditorChange}
          name="body"
          placeholder="Here's my problem..."
          style={{ width: "100%" }}
        />
        <button value="Create Post" type="submit" className="button">
          Post Your Question
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </section>
  );
};
export default NewPostForm;
