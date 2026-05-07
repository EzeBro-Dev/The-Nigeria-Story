import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-5 gap-5 text-center md:text-left md:gap-0 md:py-5 md:px-10 lg:py-5 lg:px-[90px]">
      
      <Link to="/">
        <div className="w-[100px] h-auto sm:w-[120px] md:w-[130px] lg:w-[150px] lg:h-[60px]">
          <img src={Logo} alt="Logo" className="w-full h-full object-contain cursor-pointer" />
        </div>
      </Link>

      <div className="flex justify-center items-center cursor-pointer gap-2 text-[16px] sm:gap-[10px] sm:text-[18px] md:text-[20px] lg:text-[24px]">
        <i className="fa-brands fa-x-twitter hover:text-[#f19d00] transition-colors"></i>
        <i className="fa-brands fa-youtube hover:text-[#f19d00] transition-colors"></i>
        <i className="fa-brands fa-instagram hover:text-[#f19d00] transition-colors"></i>
        <i className="fa-brands fa-tiktok hover:text-[#f19d00] transition-colors"></i>
      </div>

      <a href="#" className="text-gray-500 no-underline text-[13px] sm:text-[14px] md:text-[15px] hover:text-white transition-colors">
        Terms of Services
      </a>
      
      <a href="#" className="text-gray-500 no-underline text-[13px] sm:text-[14px] md:text-[15px] hover:text-white transition-colors">
        Privacy Policy
      </a>
      
      <a href="#" className="text-gray-500 no-underline text-[13px] sm:text-[14px] md:text-[15px] hover:text-white transition-colors">
        Community Guidelines
      </a>

      <p className="text-[#f19d00] text-[13px] sm:text-[14px] md:text-[15px] m-0">
        &copy; 2026 THE NIGERIA STORY
      </p>
      
    </footer>
  );
};

export default Footer;
