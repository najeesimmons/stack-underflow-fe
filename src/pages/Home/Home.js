import Post from "../../components/Post/Post";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { posts } = props;
  const allPosts = posts.map((post) => {
    return (
      <Post key={post._id}>
        <Link to={`/post/${post._id}`} className={styles.link}>
          <div className={styles.title}>{post.title}</div>
        </Link>
      </Post>
    );
  });

  return (
    <Wrapper>
      <div className={styles.banner}>
        <h1>Top Questions</h1>
        <Link to="/new" className={styles.link}>
          <div className={styles.button}>Ask a Question</div>
        </Link>
      </div>
      {allPosts}
    </Wrapper>
  );
};

export default Home;
