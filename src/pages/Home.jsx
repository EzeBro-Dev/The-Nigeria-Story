import '../styles/Home.css'
import Hero from "../components/Hero"
import { useRef, useState } from "react";
import Footer from '../components/Footer'

const Home = () => {

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };


  return (
    <>
      <Hero />

      <section className="what">
        <h1>
          Watch The
          <span> Trailer</span>
        </h1>

        <div className="video-cont">
          <video
            ref={videoRef}
            src="src/assets/nigeria.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="video"
          ></video>

          <div className="controls">
            <button className="controls-btn1" onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button className="controls-btn2" onClick={toggleMute}>
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>

        <button className="what-btn">Submit Your Story</button>
      </section>

      <section className="legends">
        <h1 className="legends-heading">
          The
          <span>Legends</span>
        </h1>
        <p className="legends-text">
          Honoring the figures who shaped our past and continue to define our
          shared journey into the future.
        </p>
        <div className="legends-cont">
          <div className="legends-box">
            <div className="legends-img">
              <img src="src/assets/images/shagari.png" alt="Image" />
              <div className="legends-img-text">
                <p>1979 - 1983</p>
                <h2>Shehu Shagari</h2>
                <span>1st Executive President</span>
              </div>
            </div>
            <div className="legends-info">
              <p>
                "The first democratically elected President of Nigeria after
                the...
              </p>
            </div>
          </div>

          <div className="legends-box">
            <div className="legends-img">
              <img src="src/assets/images/awolowo.png" alt="Image" />
              <div className="legends-img-text">
                <p>1954 - 1960</p>
                <h2>Obafemi Awolowo</h2>
                <span>Founding Father / Premier</span>
              </div>
            </div>
            <div className="legends-info">
              <p>
                "A key figure in Nigeria's independence movement and the
                first...
              </p>
            </div>
          </div>

          <div className="legends-box">
            <div className="legends-img">
              <img src="src/assets/images/yaradua.png" alt="Image" />
              <div className="legends-img-text">
                <p>2007 - 2010</p>
                <h2>Umaru Musa Yar'Adua</h2>
                <span>13th President</span>
              </div>
            </div>
            <div className="legends-info">
              <p>
                "A leader known for his integrity and the 'Seven-Point Agenda',
                focused...
              </p>
            </div>
          </div>

          <div className="legends-box">
            <div className="legends-img">
              <img src="src/assets/images/abacha.png" alt="Image" />
              <div className="legends-img-text">
                <p>1993 - 1998</p>
                <h2>Sani Abacha</h2>
                <span>Military Head of State</span>
              </div>
            </div>
            <div className="legends-info">
              <p>
                A powerful military leader who oversaw a period of
                significant...
              </p>
            </div>
          </div>

          <div className="legends-box">
            <div className="legends-img">
              <img src="src/assets/images/tinubu.png" alt="Image" />
              <div className="legends-img-text">
                <p>2023 - Present</p>
                <h2>Bola Ahmed Tinubu</h2>
                <span>16th President</span>
              </div>
            </div>
            <div className="legends-info">
              <p>
                "The current President of Nigeria, leading the 'Renewed Hope'
                agenda...
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="voices">
        <h1 className="voices-heading">Voices of Nigeria</h1>
        <p className="voices-text">
          Uniting a nation through the power of our shared stories.
        </p>
        <div className="voices-cont">
          <div className="voices-box">
            <div className="voices-img">
              <img src="src/assets/images/babatunde.png" alt="Image" />
              <div className="voices-img-text">
                <h2>Babatunde Aliyu</h2>
                <span>📍Lagos, Nigeria</span>
              </div>
            </div>
            <div className="voices-info">
              <p>
                "I was just a small boy when the green and white flag was
                hoisted for the very first time. The streets of Lagos were
                electric...
              </p>
            </div>
          </div>

          <div className="voices-box">
            <div className="voices-img">
              <img src="src/assets/images/nneka.png" alt="Image" />
              <div className="voices-img-text">
                <h2>Nneka Okafor</h2>
                <span>📍Enugu, Nigeria</span>
              </div>
            </div>
            <div className="voices-info">
              <p>
                "Every Saturday morning, the scent of palm oil and fresh ground
                beans would wake the entire compound up...
              </p>
            </div>
          </div>

          <div className="voices-box">
            <div className="voices-img">
              <img src="src/assets/images/sunday.png" alt="Image" />
              <div className="voices-img-text">
                <h2>Sunday Igwee</h2>
                <span>📍Abuja, FCT</span>
              </div>
            </div>
            <div className="voices-info">
              <p>
                "The Gangan drum speaks a language that only the heart can truly
                understand. In the ancient courts of Oyo...
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="mission-cont">
          <div className="mission-box1">
            <h1>What We Want to Do</h1>
            <p>
              Launching in 2026, The Nigeria Story is a historic movement to
              unite 1 million Nigerians through a single collaborative
              narrative.
            </p>
            <p>
              Using AI-powered animation, we are documenting our history,
              culture, and future dreams to show the world the true spirit of
              Nigeria.
            </p>
          </div>
          <div className="mission-box2">
            <div className="mission-box2-cont">
              <h3>Our Mission</h3>
              <p>
                <span>1</span>
                <span>Uniting 1 Million Nigerian Voices</span>
              </p>
              <p>
                <span>2</span>
                <span>AI-Powered Cultural Animation</span>
              </p>
              <p>
                <span>3</span>
                <span>Fundraising for Underserved Education</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="powered">
        <h1>Powered By</h1>
        <div className="powered-cont">
          <img src="src/assets/slumart.png" alt="Image" />
          <img src="src/assets/animationhub.png" alt="Image" />
          <div className="powered-cont2">
            <img
              src="src/assets/images/mrade.png"
              alt="Image"
              className="powered-img"
            />
            <img
              src="src/assets/adetunwase.png"
              alt="Image"
              className="powered-img2"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default Home