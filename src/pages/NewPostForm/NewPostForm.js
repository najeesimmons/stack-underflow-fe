import { useState } from "react";

const NewPostForm = (props) => {
  const { createPosts } = props;
  const [newForm, setNewForm] = useState({
    title: "",
    body: "",
    image: "",
  });

  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPosts(newForm);
    setNewForm({
      name: "",
      image: "",
      title: "",
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.body}
          name="body"
          placeholder="Ask your question here..."
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input type="submit" value="Create Post" />
      </form>
    </section>
  );
};
export default NewPostForm;
