import styles from "./Post.module.scss";

const Post = ({ children }) => {
  return <div className={styles.div}>{children}</div>;
};

export default Post;
