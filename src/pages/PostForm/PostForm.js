//react
import { useState } from "react";
//react-router-dom
import { useNavigate } from "react-router-dom";
//components
import Wrapper from "../../components/Wrapper/Wrapper";
//custom hook
import { usePostsContext } from "../../hooks/usePostsContext";
//packages
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//styles
import styles from "./PostForm.module.scss";

const NewPostForm = ({ URL }) => {
  const { dispatch } = usePostsContext();
  const navigate = useNavigate();
  const [newForm, setNewForm] = useState({
    title: "",
    body: "",
    image: "",
    comments: [],
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = (event) => {
    setNewForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditorChange = (content) => {
    setNewForm((prevForm) => ({ ...prevForm, body: content }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${URL}posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        image: "",
        comments: [],
      });
      dispatch({ type: "CREATE_POSTS", payload: data });
    }
    navigate("/");
  };

  return (
    <section>
      <Wrapper>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Title</label>
          <p className={styles.instruction}>
            Be specific and imagine you’re asking a question to another person
          </p>
          <input
            className={
              emptyFields.includes("title") ? styles.error : styles.input
            }
            type="text"
            value={newForm.title}
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <label className={styles.label}>Body</label>
          <p className={styles.instruction}>
            Include all the information someone would need to answer your
            question
          </p>
          <ReactQuill
            className={emptyFields.includes("body") ? styles.error : ""}
            value={newForm.body}
            onChange={handleEditorChange}
            name="body"
            placeholder="Here's my problem..."
            style={{ width: "100%" }}
          />
          <label className={styles.label}>Image</label>
          <p className={styles.instruction}>Add a valid URL</p>
          <input
            className={
              emptyFields.includes("image") ? styles.error : styles.input
            }
            type="text"
            value={newForm.image}
            name="image"
            placeholder="http://..."
            onChange={handleChange}
          />
          <button className={styles.button} value="Create Post" type="submit">
            Post Your Question
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </Wrapper>
    </section>
  );
};
export default NewPostForm;
