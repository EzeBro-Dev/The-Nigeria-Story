import { Link } from "react-router-dom";
import "../styles/Hero.css";
import Logo from "../assets/logo.png";
import Guinness from "../assets/guinness.png";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div>
          <div className="nav-img">
            <img src={Logo} alt="Logo" />
          </div>
          <div>
            {/* <Link to="/signup"> */}
              <button className="nav-btn">Join</button>
            {/* </Link> */}
          </div>
          <img src={Guinness} alt="Image" className="guinness" />
        </div>
      </section>

      <section className="tell">
        <h1 className="tell-header">
          <span>Tell Your </span>
          <span className="tell-header-span">Nigeria Story</span>
        </h1>
        <p className="tell-text">
          <span>Help bring Nigeria’s story to life through animation.</span>
        </p>
        <button className="tell-btn">Volunteer</button>
      </section>

      <section className="stories">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source
            src="/slumart-video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="stories-content">
          <h1>We are Breaking a Guinness World Record</h1>
        </div>
      </section>
    </>
  );
};
export default Hero;
