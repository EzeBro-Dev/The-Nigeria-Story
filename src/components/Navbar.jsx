import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/">
          <div className="nav-brand">
            <img src={Logo} alt="Img" />
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
