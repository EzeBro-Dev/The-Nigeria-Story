import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const PublicProfile = () => {
  const { id } = useParams(); // Gets the user's ID from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      // Fetch the user's profile AND their application status/passion
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          display_name,
          location,
          invites_count,
          is_admin,
          applications (status, passion)
        `)
        .eq('id', id)
        .single();

      if (!error && data) {
        setProfile(data);
        
        // Optional: In the future, you can trigger an RPC here to +1 profile_views!
      }
      setLoading(false);
    };

    fetchPublicProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#FFD700]/20 border-t-[#FFD700] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl mb-4">🕵️‍♂️</h1>
        <h2 className="text-2xl font-bold">Profile Not Found</h2>
        <p className="text-zinc-500 mt-2">This creator might have vanished into the void.</p>
        <Link to="/" className="mt-6 text-[#FFD700] hover:underline">Go Home</Link>
      </div>
    );
  }

  const appData = profile.applications?.[0]; // Get their latest application
  const isApproved = appData?.status === 'approved';
  const displayName = profile.display_name || "Anonymous Creator";

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center py-12 px-4 relative overflow-hidden font-sans">
      
      {/* AMBIENT GLOW */}
      <div className="fixed top-[-10%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-[#FFD700]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* THE PLAYER CARD */}
      <div className="w-full max-w-md bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mt-10">
        
        {/* Dynamic Badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
          {profile.is_admin ? (
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-1.5 rounded-full text-xs font-black shadow-[0_0_20px_rgba(168,85,247,0.4)] tracking-widest uppercase border border-purple-400/50">
              System Admin
            </span>
          ) : isApproved ? (
            <span className="bg-gradient-to-r from-[#FFE55C] to-[#D4AF37] text-black px-6 py-1.5 rounded-full text-xs font-black shadow-[0_0_20px_rgba(255,215,0,0.4)] tracking-widest uppercase border border-[#FFD700]/50">
              Cohort 1 Scholar
            </span>
          ) : (
            <span className="bg-zinc-800 text-zinc-300 px-6 py-1.5 rounded-full text-xs font-black shadow-lg tracking-widest uppercase border border-zinc-600">
              Waitlisted
            </span>
          )}
        </div>

        {/* Avatar & Header */}
        <div className="flex flex-col items-center mt-6 mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-zinc-800 to-black border-2 border-[#FFD700]/30 flex items-center justify-center text-5xl text-white font-black mb-4 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-black text-white text-center leading-tight">
            {displayName}
          </h1>
          <p className="text-zinc-400 text-sm mt-1 font-medium tracking-wide">
            📍 {profile.location || 'Nigeria'}
          </p>
        </div>

        {/* MMORPG Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/50 border border-white/5 rounded-2xl p-4 text-center">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Recruits</p>
            <p className="text-2xl font-black text-[#FFD700]">{profile.invites_count || 0}</p>
          </div>
          <div className="bg-black/50 border border-white/5 rounded-2xl p-4 text-center">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Status</p>
            <p className={`text-sm font-black mt-2 ${isApproved ? 'text-green-400' : 'text-zinc-300'}`}>
              {isApproved ? 'VERIFIED' : 'PENDING'}
            </p>
          </div>
        </div>

        {/* The Story Teaser (Passion) */}
        {appData?.passion && (
          <div className="bg-[#FFD700]/5 border border-[#FFD700]/10 rounded-2xl p-6 mb-8 text-center relative overflow-hidden">
            <h3 className="text-xs font-bold text-[#FFD700] uppercase tracking-widest mb-3">Core Passion</h3>
            <p className="text-zinc-300 text-sm leading-relaxed italic">
              "{appData.passion}"
            </p>
          </div>
        )}

      </div>

      {/* THE VIRAL CTA STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 w-full p-4 md:p-8 z-50 pointer-events-none flex justify-center">
        <div className="w-full max-w-md bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-auto flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Invited by {displayName}</p>
            <p className="text-sm font-bold text-white">Join the Movement</p>
          </div>
          {/* 🔥 THE MAGIC REFERRAL LINK IN ACTION 🔥 */}
          <Link 
            to={`/signup?ref=${id}`} 
            className="bg-[#FFD700] hover:bg-[#e5c100] text-black px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          >
            Apply Now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default PublicProfile;