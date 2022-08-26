import Post from "../../components/Post/Post";
import Wrapper from "../../components/Wrapper/Wrapper";
import "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { posts } = props;
  const allPosts = posts.map((post) => {
    return (
      <Post key={post._id}>
        <Link to={`/post/${post._id}`}>
          <h4>{post.title}</h4>
        </Link>
      </Post>
    );
  });

  return (
    <Wrapper>
      <h1>Top Questions</h1>
      {allPosts}
    </Wrapper>
  );
};

export default Home;
