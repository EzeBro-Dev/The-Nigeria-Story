import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const DashboardHome = () => {
  const { user, displayName } = useOutletContext();

  // State for our database data
  const [profile, setProfile] = useState(null);
  const [story, setStory] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [globalRank, setGlobalRank] = useState("...");
  const [loading, setLoading] = useState(true);

  const profileSlug = displayName.toLowerCase().replace(/\s+/g, "-");
  const profileLink = `${window.location.origin}/u/${user?.id}`;

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // 1. Fetch the user's profile stats
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        // 2. Fetch the user's story
        const { data: storyData } = await supabase
          .from("stories")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        // 3. Fetch Top 3 users for the "People Near You" / Leaderboard preview
        const { data: leaderboardData } = await supabase
          .from("profiles")
          .select("id, display_name, location, invites_count")
          .order("invites_count", { ascending: false })
          .limit(3);

        // 4. Calculate approximate rank (count users with more invites)
        if (profileData) {
          const { count } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .gt("invites_count", profileData.invites_count);
          setGlobalRank(count ? count + 1 : 1);
        }

        setProfile(profileData);
        setStory(storyData);
        setNearbyUsers(leaderboardData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
    alert("Profile link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="p-8 text-zinc-400 animate-pulse">
        Loading your dashboard data...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
      {/* Header Section */}
      <header className="flex justify-between items-center flex-wrap gap-4 bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg hover:border-[#FFD700]/30 transition-all">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-[#FFD700]">{displayName}</span>{" "}
            👋
          </h1>
          <p className="text-zinc-400 text-sm">
            Joined{" "}
            {new Date(
              profile?.created_at || user.created_at,
            ).toLocaleDateString()}{" "}
            • {profile?.location || "Nigeria"}
          </p>
        </div>
        <div className="flex  gap-4">
          <button
            onClick={copyToClipboard}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-white/5 text-white border border-[#FFD700]/20 hover:bg-white/10 transition-all font-semibold text-sm"
          >
            📋 Copy Profile Link
          </button>
          <button className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE55C] to-[#D4AF37] text-black font-bold hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,215,0,0.3)] transition-all text-sm">
            Upgrade Tier 🚀
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg hover:border-[#FFD700]/30 transition-all">
          <p className="text-xs font-bold tracking-wider text-zinc-500 mb-2">
            GLOBAL RANK
          </p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
            #{globalRank}
          </h2>
          <span className="text-sm font-medium text-zinc-400">
            Keep inviting to climb!
          </span>
        </div>
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg hover:border-[#FFD700]/30 transition-all">
          <p className="text-xs font-bold tracking-wider text-zinc-500 mb-2">
            FRIENDS INVITED
          </p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
            {profile?.invites_count || 0}
          </h2>
          <span className="text-sm font-medium text-[#FFD700]">
            Total successful invites
          </span>
        </div>
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg hover:border-[#FFD700]/30 transition-all">
          <p className="text-xs font-bold tracking-wider text-zinc-500 mb-2">
            JOINED VIA LINK
          </p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
            0
          </h2>
          <span className="text-sm font-medium text-zinc-400">
            Waitlist signups
          </span>
        </div>
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg hover:border-[#FFD700]/30 transition-all">
          <p className="text-xs font-bold tracking-wider text-zinc-500 mb-2">
            PROFILE VIEWS
          </p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
            {profile?.profile_views || 0}
          </h2>
          <span className="text-sm font-medium text-[#FFD700]">
            Since joining
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Story) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg hover:border-[#FFD700]/30 transition-all">
            <div className="flex justify-between items-center border-b border-[#FFD700]/15 pb-4 mb-6">
              <h3 className="text-lg font-bold">My Entry</h3>
              <button className="text-zinc-400 hover:text-[#FFD700] text-sm font-medium transition-colors">
                View Public Profile →
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] text-black flex items-center justify-center text-xl font-bold shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="text-base font-bold m-0">{displayName}</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  {profile?.location || "Nigeria"} •{" "}
                  <span className="text-[#FFD700]">
                    ✦ {profile?.tier || "Story Contributor"}
                  </span>
                </p>
              </div>
            </div>

            {/* Story Display OR Empty State */}
            {story ? (
              <div className="bg-black/40 p-6 border-l-4 border-[#FFD700] rounded-r-xl mb-6">
                <h4 className="text-[#FFD700] font-bold mb-2">
                  My Nigeria Story
                </h4>
                <p className="italic text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap">
                  "{story.content}"
                </p>
              </div>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/20 p-8 rounded-xl mb-6 text-center flex flex-col items-center justify-center gap-3">
                <span className="text-3xl">✍️</span>
                <p className="text-zinc-400 text-sm">
                  You haven't written your Nigeria Story yet.
                </p>
                <Link
                  to="/dashboard/story"
                  className="px-4 py-2 bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 rounded-lg text-sm font-bold hover:bg-[#FFD700]/20 transition-colors"
                >
                  Write Your Story Now
                </Link>
              </div>
            )}

            <div>
              <p className="text-sm text-zinc-400 mb-2">
                Shareable Profile Link
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={profileLink}
                  className="flex-1 bg-black/40 border border-[#FFD700]/20 rounded-lg px-4 py-2 text-zinc-400 font-mono text-sm outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-[#FFD700]/20 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Leaderboard & Notifications) */}
        <div className="flex flex-col gap-6">
          {/* Real Leaderboard Card */}
          <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg hover:border-[#FFD700]/30 transition-all">
            <div className="flex justify-between items-center border-b border-[#FFD700]/15 pb-4 mb-4">
              <h3 className="text-base font-bold">Top Contributors</h3>
              <span className="bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 px-3 py-1 rounded-full text-xs font-bold">
                Live
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {nearbyUsers.map((lbUser, index) => (
                <div
                  key={lbUser.id}
                  className={`flex items-center gap-3 p-3 ${lbUser.id === user.id ? "bg-white/5 rounded-lg border border-[#FFD700]/10" : "border-b border-white/5"}`}
                >
                  <span
                    className={`text-xs font-mono ${index === 0 ? "text-[#FFD700]" : "text-zinc-500"}`}
                  >
                    #{index + 1}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${lbUser.id === user.id ? "bg-[#FFD700] text-black" : "bg-zinc-800 text-white"}`}
                  >
                    {lbUser.display_name?.substring(0, 2).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-sm font-bold m-0 ${lbUser.id === user.id ? "text-[#FFD700]" : "text-white"}`}
                    >
                      {lbUser.id === user.id ? "You" : lbUser.display_name}
                    </h4>
                    <p className="text-[10px] text-zinc-400">
                      {lbUser.location || "Nigeria"}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-bold ${lbUser.id === user.id ? "text-[#FFD700]" : "text-white"}`}
                  >
                    {lbUser.invites_count} inv
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-center text-zinc-400 mt-4 pt-4 border-t border-dashed border-[#FFD700]/15">
              Keep inviting to climb the global ranks!
            </p>
          </div>

          {/* Notifications Card (Still static for UI purposes) */}
          <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg hover:border-[#FFD700]/30 transition-all">
            <div className="flex justify-between items-center border-b border-[#FFD700]/15 pb-4 mb-4">
              <h3 className="text-base font-bold">Activity</h3>
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold">
                System
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-xl">
                  🚀
                </div>
                <div>
                  <p className="text-sm mb-1">
                    <strong className="text-[#FFD700]">Welcome!</strong> Your
                    profile is ready.
                  </p>
                  <span className="text-[10px] text-zinc-500">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
