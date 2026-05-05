import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 left-0 z-50">
      <nav className="flex justify-between items-center bg-black/60 backdrop-blur-lg border-b border-white/5 py-3 px-5 lg:px-[50px]">
        <Link to="/" className="group">
          <div className="w-[100px] md:w-[160px] lg:w-[180px]">
            <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {!loading && (
            user ? (
              <Link to="/dashboard" className="flex items-center gap-3 group">
                <span className="hidden md:block text-sm font-medium text-zinc-400 group-hover:text-[#FFD700] transition-colors">
                  My Dashboard
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] text-black flex items-center justify-center font-bold border-2 border-transparent group-hover:border-[#FFD700] transition-all">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </Link>
            ) : (
              <Link to="/signup">
                <button className="px-6 py-2 md:px-10 md:py-3 font-extrabold bg-[#f19d00] text-white rounded-tl-[20px] rounded-br-[20px] hover:scale-105 transition-all text-sm md:text-lg">
                  Join
                </button>
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;