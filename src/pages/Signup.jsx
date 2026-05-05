import { useState, useEffect } from "react";
import { sendMagicLink, loginWithGoogle } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Google from '../assets/google.png';
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSendLink = async (e) => {
    e.preventDefault();
    if (loading || cooldown > 0) return;

    setLoading(true);
    const res = await sendMagicLink(email);

    if (res?.error) {
      setMessage({ type: 'error', text: res.error });
    } else {
      setMessage({ type: 'success', text: "Magic link sent! Check your inbox." });
      setCooldown(30);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <section className="min-h-screen bg-[#050505] flex flex-col md:flex-row">
      {/* Visual Side */}
      <div className="hidden md:flex w-1/2 bg-[url('/hero-bg.png')] bg-cover bg-center relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-black text-white leading-tight">
            Tell Us Your <br />
            <span className="text-[#FFD700]">Nigeria Story</span>
          </h1>
          <p className="text-xl text-zinc-300 mt-6 max-w-md mx-auto">
            Join the historic collaborative animation project and make your mark.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-zinc-400 mt-2">Start your journey into the world of storytelling.</p>
          </div>

          <button 
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-4 bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl transition-all mb-6"
          >
            <img src={Google} alt="Google" className="w-6 h-6" />
            Continue with Google
          </button>

          <div className="relative flex items-center py-4 mb-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-sm font-medium uppercase tracking-widest">or email</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <form onSubmit={handleSendLink} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                placeholder="amina@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || cooldown > 0}
              className={`w-full py-4 rounded-xl font-black transition-all ${
                loading || cooldown > 0 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-[#f19d00] text-white hover:shadow-[0_0_20px_rgba(241,157,0,0.4)]'
              }`}
            >
              {loading ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Send Magic Link"}
            </button>
          </form>

          {message.text && (
            <div className={`mt-6 p-4 rounded-xl text-sm font-bold border ${message.type === 'success' ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-red-900/20 text-red-400 border-red-500/30'}`}>
              {message.text}
            </div>
          )}

          <p className="mt-10 text-center text-zinc-500 text-sm">
            By continuing, you acknowledge our <br />
            <a href="#" className="text-zinc-300 hover:text-[#FFD700] underline">Privacy Policy</a> & <a href="#" className="text-zinc-300 hover:text-[#FFD700] underline">Terms of Service</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
