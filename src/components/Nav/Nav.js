import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../index.scss";

const Nav = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <section className="nav-container">
      <nav className="site-nav grid">
        <div className="logo">
          <Link to="/">
            <p className="stack">stack</p>
            <p className="underflow">underflow</p>
          </Link>
        </div>
        {user && (
          <ul className="login-status">
            <li className="button" onClick={handleClick}>
              Log out
            </li>
          </ul>
        )}
        {!user && (
          <div className="login-status">
            <Link to="/login" className="button">
              <span>Log in</span>
            </Link>
            <Link to="/signup" className="button signup">
              <span>Sign up</span>
            </Link>
          </div>
        )}
      </nav>
    </section>
  );
};
export default Nav;
