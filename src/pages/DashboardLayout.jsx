import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // 🔥 Added admin state back
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }

      // Check Admin and App status
      const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', session.user.id).single();
      const { data: app } = await supabase.from('applications').select('status').eq('user_id', session.user.id).maybeSingle();

      const userIsAdmin = profile?.is_admin === true;
      setIsAdmin(userIsAdmin); // 🔥 Store admin status

      if (userIsAdmin || app?.status === 'approved') {
        setUser(session.user);
        setLoading(false);
      } else {
        // Kick them to the application/waiting room
        navigate('/apply');
      }
    };
    checkAccess();
  }, [navigate]);

  // Note: Removed the second redundant useEffect here. The single checkAccess block handles it faster!

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#FFD700]/20 border-t-[#FFD700] rounded-full animate-spin"></div>
    </div>
  );

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Contributor";

  // Polished Active State for Links
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm w-full group ${
      isActive
        ? "bg-gradient-to-r from-[#FFD700]/10 to-transparent text-[#FFD700] border-l-4 border-[#FFD700] rounded-l-none shadow-[inset_10px_0_20px_rgba(255,215,0,0.05)]"
        : "text-zinc-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
    }`;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-[#050505] text-[#FAFAFA] font-sans relative overflow-hidden">
      
      {/* AMBIENT BACKGROUND GLOW - This is the "Million Dollar" touch */}
      <div className="fixed top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#FFD700]/5 blur-[120px] rounded-full pointer-events-none z-0 hidden md:block"></div>
      
      {/* Mobile Top Bar (Frosted Glass) */}
      <div className="md:hidden flex items-center justify-between bg-[#050505]/80 backdrop-blur-lg border-b border-white/5 p-4 sticky top-0 z-40">
        <div className="font-bold text-white tracking-wide flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37]"></div>
          <span><span className="text-[#FFD700]">Nigeria</span> Story</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors border border-white/5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeMenu}
      />

      {/* Sidebar - Upgraded with deeper dark mode & better shadows */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#080808] border-r border-white/5 p-6 flex flex-col gap-10 shrink-0 h-screen overflow-y-auto transform transition-transform duration-400 ease-out md:static md:translate-x-0 shadow-2xl md:shadow-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <button onClick={closeMenu} className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white md:hidden bg-white/5 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center gap-4 pb-8 border-b border-dashed border-white/10 mt-6 md:mt-0 relative group cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] text-black flex items-center justify-center text-2xl font-bold shadow-[0_0_20px_rgba(255,215,0,0.15)] group-hover:scale-105 transition-transform duration-300">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="w-full">
            <h2 className="text-lg font-bold text-white break-words group-hover:text-[#FFD700] transition-colors">{displayName}</h2>
            <p className="text-xs text-zinc-500 mb-3 break-all">{user?.email}</p>
            {/* Dynamic Badge for Admins vs Contributors */}
            <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border tracking-wide uppercase ${isAdmin ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-[#FFD700]/5 text-[#FFD700] border-[#FFD700]/20'}`}>
              {isAdmin ? 'System Admin' : 'Story Contributor'}
            </span>
          </div>
        </div>

        {/* Navigation Menus */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-600 ml-4 mb-2 font-bold">Main</h3>
            <NavLink to="/dashboard" end className={navLinkClass} onClick={closeMenu}>
              <span className="text-lg w-6 text-center opacity-80 group-hover:opacity-100">🏠</span> Dashboard
            </NavLink>
            <NavLink to="/dashboard/profile" className={navLinkClass} onClick={closeMenu}>
              <span className="text-lg w-6 text-center opacity-80 group-hover:opacity-100">👤</span> My Profile
            </NavLink>
            <NavLink to="/dashboard/story" className={navLinkClass} onClick={closeMenu}>
              <span className="text-lg w-6 text-center opacity-80 group-hover:opacity-100">✍️</span> My Story
            </NavLink>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-600 ml-4 mb-2 font-bold">Movement</h3>
            <NavLink to="/dashboard/leaderboard" className={navLinkClass} onClick={closeMenu}>
              <span className="text-lg w-6 text-center opacity-80 group-hover:opacity-100">🏆</span> Leaderboard
            </NavLink>
          </div>

          {/* 🔥 ADMIN ONLY MENU */}
          {isAdmin && (
            <div className="flex flex-col gap-1">
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-600 ml-4 mb-2 font-bold">Administration</h3>
              <NavLink 
                to="/dashboard/admin" 
                className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm w-full group border ${
                  isActive 
                    ? "bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 shadow-[0_0_15px_rgba(241,157,0,0.1)]" 
                    : "text-[#FFD700]/70 border-transparent hover:bg-white/5 hover:text-[#FFD700]"
                }`}
                onClick={closeMenu}
              >
                <span className="text-lg w-6 text-center opacity-80 group-hover:opacity-100">⚡</span> Command Center
              </NavLink>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-600 ml-4 mb-2 font-bold">Account</h3>
            <NavLink to="/dashboard/settings" className={navLinkClass} onClick={closeMenu}>
              <span className="text-lg w-6 text-center opacity-80 group-hover:opacity-100">⚙️</span> Settings
            </NavLink>
            
            <button onClick={handleSignOut} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all font-medium text-sm text-left group mt-2">
              <span className="w-6 flex justify-center text-zinc-500 group-hover:text-red-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </span>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - with z-10 so it sits above the ambient glow */}
      <div className="flex-1 w-full md:w-[calc(100%-280px)] h-[calc(100vh-73px)] md:h-screen overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth">
        <Outlet context={{ user, displayName }} />
      </div>
      
    </section>
  );
};

export default DashboardLayout;