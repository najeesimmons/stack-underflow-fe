import styles from "./Post.module.scss"

const Post = (props) => {
  return <div className={styles.div}>{props.children}</div>;
};

export default Post;
