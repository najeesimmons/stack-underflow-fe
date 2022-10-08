//components
import Post from "../../components/Post/Post";
//custom hooks
import { usePostsContext } from "../../hooks/usePostsContext";
//react-router-dom
import { Link } from "react-router-dom";
//react
import { useEffect } from "react";
//fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "../../index.scss";

const Home = ({ URL }) => {
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`${URL}posts/`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: data });
      }
    };

    getPosts();
  }, [dispatch, URL]);

  return (
    <section className="grid home">
      <h1 className="heading">Top Questions</h1>
      <Link to="/new" className="ask-question">
        <div className="button">Ask a Question</div>
      </Link>
      {posts &&
        posts.map((post) => (
          <Post key={post._id}>
            <Link to={`/post/${post._id}`}>
              <div>{post.title}</div>
            </Link>
            <p>{post.user_id}</p>
            <p>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </Post>
        ))}
    </section>
  );
};

export default Home;
