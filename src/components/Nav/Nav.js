import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";
import { useLogout } from "../../hooks/useLogout";

const Nav = () => {
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <div className={styles.div}>
      <nav className={styles.nav}>
        <Link to="/">
          <p className={styles.stack}>stack</p>
          <p className={styles.underflow}>underflow</p>
        </Link>
        <div>
          <button onClick={handleClick}>Log out</button>
        </div>
        <div className={styles.auth}>
          <Link to="/login">Log in</Link>
          <Link to="/signup" className={styles.signup}>
            Sign up
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Nav;
