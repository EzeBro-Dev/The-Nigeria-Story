import { Link } from "react-router-dom";
import "../styles/Footer.css";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Link to="/">
          <div className="footer-brand">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>
        <div className="footer-social">
          <i class="fa-brands fa-x-twitter"></i>
          <i class="fa-brands fa-youtube"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-tiktok"></i>
        </div>
        <a href="#">Terms of Services</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Community Guideliness</a>
        <p>&copy; 2026 THE NIGERIA STORY</p>
      </footer>
    </>
  );
};
export default Footer;
