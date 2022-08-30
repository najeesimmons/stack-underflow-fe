import { useState } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./NewPostForm.module.scss";

const NewPostForm = (props) => {
  const { createPosts } = props;
  const [newForm, setNewForm] = useState({
    title: "",
    body: "",
    image: "",
    comments: [],
  });

  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
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
          <textarea
            className={`${styles.input} ${styles.body}`}
            type="text"
            value={newForm.body}
            name="body"
            placeholder="Ask your question here..."
            onChange={handleChange}
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
