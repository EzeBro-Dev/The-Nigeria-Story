import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/">
          <div className="nav-brand">
            <img src="src/assets/logo.png" alt="Img" />
          </div>
        </Link>
        <Link to="/signup">
          <button className="nav-btn">Join</button>
        </Link>
      </nav>
    </header>
  );
};
export default Navbar;
