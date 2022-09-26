//from react
import { useState } from "react";
//components
import Wrapper from "../../components/Wrapper/Wrapper";
//styles
import styles from "./PostForm.module.scss";
//packages
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { usePostsContext } from "../../hooks/usePostsContext";

const NewPostForm = ({ URL }) => {
  const { dispatch } = usePostsContext();
  const [newForm, setNewForm] = useState({
    title: "",
    body: "",
    image: "",
    comments: [],
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('clicked')
    const response = await fetch(`${URL}posts/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newForm),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("error");
    }
    if (response.ok) {
      setNewForm({
        title: "",
        body: "",
        image: "",
        comments: [],
      });
      dispatch({ type: "CREATE_POSTS", payload: data });
    }
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
            className={styles.input}
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
            value={newForm.body}
            onChange={handleEditorChange}
            name="body"
            placeholder="Here's my problem..."
            style={{ width: "100%" }}
          />
          <label className={styles.label}>Image</label>
          <p className={styles.instruction}>Add a valid URL</p>
          <input
            className={styles.input}
            type="text"
            value={newForm.image}
            name="image"
            placeholder="http://..."
            onChange={handleChange}
          />
          <button className={styles.button} value="Create Post" type="submit">
            Post Your Question
          </button>
        </form>
      </Wrapper>
    </section>
  );
};
export default NewPostForm;
