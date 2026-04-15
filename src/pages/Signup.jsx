import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Signup.css'
import { useState } from "react";
import { sendMagicLink, loginWithGoogle } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendLink = async (e) => {
    e.preventDefault();

    if (loading || cooldown > 0) return;

    if (!email) {
      setMessage("Enter email first");
      return;
    }

    setLoading(true);
    setMessage("");

    const res = await sendMagicLink(email);

    if (res?.error) {
      setMessage(res.error);
    } else {
      setMessage("Check your email for login link");
      startCooldown();
    }

    setLoading(false);
  };

  const startCooldown = () => {
    setCooldown(30);

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setOtpSent(false); // 🔥 unlock resend here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <section className="signup">
        <div className="signup-text">
          <h1>
            Tell Us Your
            <span> Nigeria Story</span>
          </h1>
          <p>An historic collaborative animation project</p>
        </div>
        <button onClick={loginWithGoogle}>
          <img src="src/assets/google.png" alt="Google" />
          <span>Continue with Google</span>
        </button>
        <span>OR</span>
        <form onSubmit={handleSendLink}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading || cooldown > 0}>
            {loading
              ? "Sending..."
              : cooldown > 0
                ? `Wait ${cooldown}s`
                : "Send Login Link"}
          </button>
        </form>
        <p>{message}</p>
        <p className="policy-link">
          By continuing, you acknowledge our
          <a href="#">Privacy Policy.</a>
        </p>
      </section>
      <Footer />
    </>
  );
}
export default Signup