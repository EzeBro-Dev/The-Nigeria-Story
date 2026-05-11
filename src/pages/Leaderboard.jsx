import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Leaderboard = () => {
  const { user, displayName } = useOutletContext();
  const [leaders, setLeaders] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [myStats, setMyStats] = useState({ invites: 0, rank: '-', isAdmin: false });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generate the Magic Link based on their actual URL
  const inviteLink = `${window.location.origin}/signup?ref=${user?.id}`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!user) return;

      // 1. Fetch Top 50 Users (Excluding Admins)
      const { data: topUsers } = await supabase
        .from('profiles')
        .select('id, display_name, location, invites_count')
        .eq('is_admin', false) // Exclude admins!
        .order('invites_count', { ascending: false })
        .limit(50);

      // 2. Fetch Total Count of Non-Admin Contributors
      const { count: totalContributors } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_admin', false);

      // 3. Fetch My Stats & Calculate My Rank
      const { data: myProfile } = await supabase
        .from('profiles')
        .select('invites_count, is_admin')
        .eq('id', user.id)
        .single();

      let myRank = '-';
      if (myProfile && !myProfile.is_admin) {
        // Count how many people have MORE invites than me to find my rank
        const { count: higherRanked } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_admin', false)
          .gt('invites_count', myProfile.invites_count);
        
        myRank = (higherRanked || 0) + 1;
      }

      setLeaders(topUsers || []);
      setTotalUsers(totalContributors || 0);
      setMyStats({
        invites: myProfile?.invites_count || 0,
        rank: myRank,
        isAdmin: myProfile?.is_admin || false
      });
      setLoading(false);
    };

    fetchLeaderboard();
  }, [user]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="text-zinc-400 p-8 animate-pulse">Loading Live Rankings...</div>;

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header & Magic Link Card */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Global Leaderboard 🏆</h1>
          <p className="text-zinc-400 text-sm">See how you rank against {totalUsers.toLocaleString()} other contributors.</p>
        </div>
        
        {/* The Magic Link Generator */}
        <div className="bg-white/5 border border-[#FFD700]/30 rounded-xl p-4 w-full lg:w-auto shadow-[0_0_15px_rgba(255,215,0,0.05)]">
          <p className="text-xs text-[#FFD700] font-bold uppercase tracking-wider mb-2">Your Magic Invite Link</p>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              readOnly 
              value={inviteLink}
              className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-300 w-full lg:w-64 focus:outline-none"
            />
            <button 
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-green-500 text-black' : 'bg-[#FFD700] text-black hover:bg-[#e5c100]'}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {leaders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mt-8">
          
          {/* Rank 2 - Silver */}
          {leaders[1] && (
            <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-zinc-500/30 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center order-2 md:order-1 transform md:scale-95">
              <div className="w-16 h-16 rounded-full bg-zinc-300 text-black flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_rgba(212,212,216,0.3)]">
                {leaders[1].display_name.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-bold text-lg">{leaders[1].display_name}</h3>
              <p className="text-xs text-zinc-400 mb-4">{leaders[1].location || 'Nigeria'}</p>
              <span className="text-xl font-bold text-zinc-300">{leaders[1].invites_count} inv</span>
              <div className="w-full bg-zinc-500/20 text-zinc-300 py-1 rounded-md mt-4 font-mono text-sm">#2</div>
            </div>
          )}

          {/* Rank 1 - Gold */}
          {leaders[0] && (
            <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/50 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,215,0,0.15)] flex flex-col items-center text-center order-1 md:order-2 z-10 relative">
              <div className="absolute -top-4 bg-gradient-to-r from-[#FFE55C] to-[#D4AF37] text-black px-4 py-1 rounded-full text-xs font-black shadow-lg uppercase tracking-wider">
                👑 Champion
              </div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] text-black flex items-center justify-center text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                {leaders[0].display_name.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-bold text-xl text-[#FFD700]">{leaders[0].display_name}</h3>
              <p className="text-xs text-zinc-400 mb-4">{leaders[0].location || 'Nigeria'}</p>
              <span className="text-2xl font-bold text-white">{leaders[0].invites_count} inv</span>
              <div className="w-full bg-[#FFD700]/20 text-[#FFD700] py-1 rounded-md mt-4 font-mono text-sm font-bold">#1</div>
            </div>
          )}

          {/* Rank 3 - Bronze */}
          {leaders[2] && (
            <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#CD7F32]/30 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center order-3 transform md:scale-95">
              <div className="w-16 h-16 rounded-full bg-[#CD7F32] text-black flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_rgba(205,127,50,0.3)]">
                {leaders[2].display_name.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-bold text-lg">{leaders[2].display_name}</h3>
              <p className="text-xs text-zinc-400 mb-4">{leaders[2].location || 'Nigeria'}</p>
              <span className="text-xl font-bold text-[#CD7F32]">{leaders[2].invites_count} inv</span>
              <div className="w-full bg-[#CD7F32]/20 text-[#CD7F32] py-1 rounded-md mt-4 font-mono text-sm">#3</div>
            </div>
          )}
        </div>
      )}

      {/* List View (Rank 4+) */}
      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg mt-4">
        <h3 className="text-lg font-bold mb-6 border-b border-[#FFD700]/15 pb-4 text-zinc-300">The Next Contenders</h3>

        <div className="flex flex-col gap-2">
          {leaders.slice(3).map((leader, index) => (
            <div key={leader.id} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10">
              <span className="text-sm font-mono text-zinc-500 w-8">#{index + 4}</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-zinc-300">
                {leader.display_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="font-bold m-0 text-zinc-200">{leader.display_name}</h4>
                <p className="text-xs text-zinc-500">{leader.location || 'Nigeria'}</p>
              </div>
              <span className="font-bold text-zinc-400">{leader.invites_count} inv</span>
            </div>
          ))}

          {leaders.length <= 3 && (
             <p className="text-center text-zinc-500 py-4 text-sm">More contenders will appear here soon.</p>
          )}

          {/* Current User Context (Highlighted at the bottom) */}
          <div className="flex items-center gap-4 p-4 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-xl mt-4 shadow-inner">
            <span className="text-sm font-mono text-[#FFD700] w-8">
              {myStats.isAdmin ? 'ADM' : `#${myStats.rank}`}
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] text-black flex items-center justify-center font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#FFD700] m-0">You {myStats.isAdmin && '(Admin)'}</h4>
              <p className="text-xs text-[#FFD700]/70">Your Stats</p>
            </div>
            <span className="font-bold text-[#FFD700] text-lg">{myStats.invites} inv</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;