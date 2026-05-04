import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header className="sticky top-0 left-0 z-50">
      {/* Frosted Glass Background + Subtle bottom border */}
      <nav className="flex justify-between items-center bg-black/60 backdrop-blur-lg border-b border-white/5 text-white py-3 px-5 md:px-[30px] lg:px-[50px] shadow-lg">
        
        <Link to="/" className="group">
          <div className="w-[70px] h-auto sm:w-[130px] md:w-[90px] lg:w-[100px] transition-transform duration-500 group-hover:scale-105">
            <img src={Logo} alt="The Nigeria Story Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.1)]" />
          </div>
        </Link>

        <Link to="/signup">
          <button className="relative overflow-hidden font-extrabold cursor-pointer transition-all duration-300 ease-out bg-gradient-to-r from-[#f19d00] to-[#D4AF37] text-black rounded-tl-[20px] rounded-br-[20px] rounded-tr-sm rounded-bl-sm hover:scale-105 hover:shadow-[0_0_25px_rgba(241,157,0,0.4)] text-[14px] px-[20px] py-[8px] sm:text-[16px] sm:px-[25px] sm:py-[10px] md:text-[18px] md:px-[35px] lg:text-[20px] lg:px-[45px]">
            Join the Movement
          </button>
        </Link>

      </nav>
    </header>
  );
};

export default Navbar;