import { useState, useEffect } from "react";
import { signUpWithEmail, signInWithEmail, loginWithGoogle, resetPassword } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Google from '../assets/google.png';
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false); 
  const [isForgotPassword, setIsForgotPassword] = useState(false); // New Forgot Password state
  const [showPassword, setShowPassword] = useState(false); // New Password Visibility state
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- FOOLPROOF CAPTURE: Snatch the referral code from the URL ---
// This looks inside the "backpack" (?) to find the ref code!
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    
    if (ref) {
      localStorage.setItem('magic_invite_ref', ref);
    }
  }, []);

  useEffect(() => {
    if (user) navigate('/apply');
  }, [user, navigate]);

  // Handle standard Login/Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    let res;
    if (isLogin) {
      res = await signInWithEmail(email, password);
      if (res?.error) {
        setMessage({ type: 'error', text: res.error.message || "Failed to log in." });
      }
    } else {
      res = await signUpWithEmail(email, password);
      if (res?.error) {
        setMessage({ type: 'error', text: res.error.message || "Failed to sign up." });
      } else {
        setMessage({ type: 'success', text: "Success! Please check your email to verify your account." });
      }
    }
    setLoading(false);
  };

  // Handle Forgot Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (loading || !email) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    const res = await resetPassword(email);
    if (res?.error) {
      setMessage({ type: 'error', text: res.error.message || "Failed to send reset link." });
    } else {
      setMessage({ type: 'success', text: "Password reset link sent! Check your inbox." });
      setTimeout(() => setIsForgotPassword(false), 3000); // Go back to login after 3 seconds
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-[#050505] flex flex-col md:flex-row">
      {/* Visual Side */}
      <div className="hidden md:flex w-1/2 bg-[url('/hero-bg.png')] bg-cover bg-center relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-black text-white leading-tight">
            Tell Us Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f19d00] to-[#FFE55C]">Nigeria Story</span>
          </h1>
          <p className="text-xl text-zinc-300 mt-6 max-w-md mx-auto">
            Join the historic collaborative animation project and make your mark.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
        
        {/* Top Right Toggle */}
        {!isForgotPassword && (
          <div className="absolute top-8 right-8 text-sm text-zinc-400 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage({ type: '', text: '' }); 
              }}
              className="text-[#FFD700] hover:text-white transition-colors font-bold ml-1"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>
        )}

        <div className="w-full max-w-md mt-12 md:mt-0">
          
          {/* Header Texts */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white">
              {isForgotPassword ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-zinc-400 mt-2">
              {isForgotPassword 
                ? "Enter your email and we'll send you a link to reset your password." 
                : isLogin 
                  ? "Log in to access your dashboard." 
                  : "Start your journey into the world of storytelling."}
            </p>
          </div>

          {!isForgotPassword && (
            <>
              <button 
                onClick={loginWithGoogle}
                type="button"
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
            </>
          )}

          {/* THE FORMS */}
          <form onSubmit={isForgotPassword ? handleResetPassword : handleSubmit} className="space-y-5">
            
            {/* Email Field (Always Visible) */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                placeholder="amina@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {/* Password Field (Hidden in Forgot Password mode) */}
            {!isForgotPassword && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide">Password</label>
                  {isLogin && (
                    <button 
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setMessage({ type: '', text: '' });
                      }}
                      className="text-xs font-bold text-zinc-400 hover:text-[#FFD700] transition-colors"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                
                {/* Custom Password Input with Eye Icon */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-5 pr-12 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-1"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 mt-4 rounded-xl font-black transition-all ${
                loading 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#f19d00] to-[#D4AF37] text-black hover:shadow-[0_0_20px_rgba(241,157,0,0.4)] hover:-translate-y-1'
              }`}
            >
              {loading 
                ? "Processing..." 
                : isForgotPassword 
                  ? "Send Reset Link" 
                  : isLogin ? "Log In" : "Create Account"}
            </button>
          </form>

          {/* Go Back button for Forgot Password mode */}
          {isForgotPassword && (
            <button 
              onClick={() => {
                setIsForgotPassword(false);
                setMessage({ type: '', text: '' });
              }}
              className="w-full text-center mt-6 text-sm font-bold text-zinc-400 hover:text-white transition-colors"
            >
              ← Back to Login
            </button>
          )}

          {message.text && (
            <div className={`mt-6 p-4 rounded-xl text-sm font-bold border ${message.type === 'success' ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-red-900/20 text-red-400 border-red-500/30'}`}>
              {message.text}
            </div>
          )}

          {!isLogin && !isForgotPassword && (
            <p className="mt-8 text-center text-zinc-500 text-xs leading-relaxed">
              By creating an account, you acknowledge our <br />
              <a href="#" className="text-zinc-300 hover:text-[#FFD700] underline">Privacy Policy</a> & <a href="#" className="text-zinc-300 hover:text-[#FFD700] underline">Terms of Service</a>.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Signup;