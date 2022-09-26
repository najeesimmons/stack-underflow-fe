//components
import Post from "../../components/Post/Post";
import Wrapper from "../../components/Wrapper/Wrapper";
//custom hooks
import { usePostsContext } from "../../hooks/usePostsContext";
//react-router-dom
import { Link } from "react-router-dom";
//react
import { useEffect } from "react";
//styles
import styles from "./Home.module.scss";

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const URL = "http://localhost:4000/";

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`${URL}posts/`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: data });
      }
    };

    getPosts();
  }, [dispatch]);

  return (
    <Wrapper>
      <div className={styles.banner}>
        <h1>Top Questions</h1>
        <Link to="/new" className={styles.link}>
          <div className={styles.button}>Ask a Question</div>
        </Link>
      </div>
      {posts && posts.map(post => (
        <Post key={post._id}>
        <Link to={`/post/${post._id}`} className={styles.link}>
          <div className={styles.title}>{post.title}</div>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </Link>
      </Post>
      ))}
    </Wrapper>
  );
};

export default Home;
