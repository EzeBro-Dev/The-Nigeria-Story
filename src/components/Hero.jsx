import { Link } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div>
          <div className="nav-img">
            <img src="src/assets/logo.png" alt="Logo" />
          </div>
          <div>
            <Link to="/signup">
              <button className="nav-btn">Join</button>
            </Link>
          </div>
          <img src="src/assets/guinness.png" alt="Image" className="guinness" />
        </div>
      </section>

      <section className="tell">
        <h1 className="tell-header">
          <span>Tell Your </span>
          <span className="tell-header-span">Nigeria Story</span>
        </h1>
        <p className="tell-text">
          <span>Help bring Nigeria’s story to life through animation.</span>
          {/* <span>
            You set the tone. You drive the drama. You decide what happens next.
            No agents, no studio gatekeepers: Just you, your ideas, and the
            power to shape the story.
          </span> */}
        </p>
        <button className="tell-btn">Volunteer</button>
      </section>

      <section className="stories">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source
            src="src/assets/slumart.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="stories-content">
          <h1>We are Breaking a Guinness World Record</h1>
          {/* <p>
            Here's a peek at some of the dynamic art styles you can easily
            customize to create captivating scenes and shows.
          </p> */}
        </div>
      </section>
    </>
  );
};
export default Hero;
