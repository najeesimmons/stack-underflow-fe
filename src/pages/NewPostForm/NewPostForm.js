import { useState } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./NewPostForm.module.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewPostForm = ({ createPosts }) => {
  const [editor, setEditor] = useState("");

  const [newForm, setNewForm] = useState({
    title: "",
    body: editor,
    image: "",
    comments: [],
  });

  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
    console.log(newForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPosts(newForm);
    setNewForm({
      title: "",
      body: "",
      image: "",
      comments: [],
    });
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
            value={editor} // this may be the issue
            onChange={(value) => setEditor(value)}
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
