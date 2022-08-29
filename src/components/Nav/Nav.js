import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <div className={styles.div}>
      <nav className={styles.nav}>
        <Link to="/">Stack Underflow</Link>
        <Link to="/new">New Post</Link>
      </nav>
    </div>
  );
};
export default Nav;