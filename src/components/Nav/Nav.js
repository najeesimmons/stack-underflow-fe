import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <div className={styles.div}>
      <nav className={styles.nav}>
        <Link to="/">
          <p className={styles.stack}>stack</p>
          <p className={styles.underflow}>underflow</p>
        </Link>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </nav>
    </div>
  );
};
export default Nav;
