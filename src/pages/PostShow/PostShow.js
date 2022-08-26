import { useParams } from "react-router-dom";
import "./PostShow.module.scss";
import Wrapper from "../../components/Wrapper/Wrapper";

const PostShow = (props) => {
  const { posts } = props;

  const { id } = useParams();
  const post = posts.find((p) => p._id === id);

  return (
    <Wrapper>
      <h1>Post Show</h1>
      <h2>{post.title}</h2>
      <h3>{post.body}</h3>
    </Wrapper>
  );
};

export default PostShow;
