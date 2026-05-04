import { useOutletContext } from "react-router-dom";

const Leaderboard = () => {
  const { displayName } = useOutletContext();

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Global Leaderboard 🏆
          </h1>
          <p className="text-zinc-400 text-sm">
            See how you rank against 257,000+ other contributors.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-500 mb-1">Your Rank</p>
          <p className="text-2xl font-bold text-[#FFD700]">#4,231</p>
        </div>
      </header>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mt-4">
        {/* Rank 2 - Silver */}
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-zinc-500/30 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center order-2 md:order-1 transform md:scale-95">
          <div className="w-16 h-16 rounded-full bg-zinc-300 text-black flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_rgba(212,212,216,0.3)]">
            O
          </div>
          <h3 className="font-bold text-lg">Oluwaseun B.</h3>
          <p className="text-xs text-zinc-400 mb-4">Abuja</p>
          <span className="text-xl font-bold text-zinc-300">1,402 inv</span>
          <div className="w-full bg-zinc-500/20 text-zinc-300 py-1 rounded-md mt-4 font-mono text-sm">
            #2
          </div>
        </div>

        {/* Rank 1 - Gold */}
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/50 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,215,0,0.15)] flex flex-col items-center text-center order-1 md:order-2 z-10 relative">
          <div className="absolute -top-4 bg-gradient-to-r from-[#FFE55C] to-[#D4AF37] text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
            👑 CHAMPION
          </div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] text-black flex items-center justify-center text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
            C
          </div>
          <h3 className="font-bold text-xl text-[#FFD700]">Chinedu E.</h3>
          <p className="text-xs text-zinc-400 mb-4">Lagos</p>
          <span className="text-2xl font-bold text-white">2,105 inv</span>
          <div className="w-full bg-[#FFD700]/20 text-[#FFD700] py-1 rounded-md mt-4 font-mono text-sm font-bold">
            #1
          </div>
        </div>

        {/* Rank 3 - Bronze */}
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#CD7F32]/30 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center order-3 transform md:scale-95">
          <div className="w-16 h-16 rounded-full bg-[#CD7F32] text-black flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_rgba(205,127,50,0.3)]">
            A
          </div>
          <h3 className="font-bold text-lg">Aisha M.</h3>
          <p className="text-xs text-zinc-400 mb-4">Kano</p>
          <span className="text-xl font-bold text-[#CD7F32]">1,150 inv</span>
          <div className="w-full bg-[#CD7F32]/20 text-[#CD7F32] py-1 rounded-md mt-4 font-mono text-sm">
            #3
          </div>
        </div>
      </div>

      {/* List View */}
      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg mt-4">
        <h3 className="text-lg font-bold mb-6 border-b border-[#FFD700]/15 pb-4">
          The Next 100
        </h3>

        <div className="flex flex-col gap-2">
          {/* A Mock List of users */}
          {[4, 5, 6, 7].map((rank) => (
            <div
              key={rank}
              className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10"
            >
              <span className="text-sm font-mono text-zinc-500 w-8">
                #{rank}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                U
              </div>
              <div className="flex-1">
                <h4 className="font-bold m-0">User {rank}</h4>
                <p className="text-xs text-zinc-400">Nigeria</p>
              </div>
              <span className="font-bold text-zinc-300">
                {1000 - rank * 50} inv
              </span>
            </div>
          ))}

          {/* Current User Context */}
          <div className="flex items-center gap-4 p-4 bg-[#FFD700]/5 border border-[#FFD700]/30 rounded-xl mt-4">
            <span className="text-sm font-mono text-[#FFD700] w-8">#4k</span>
            <div className="w-10 h-10 rounded-full bg-[#FFD700] text-black flex items-center justify-center font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#FFD700] m-0">You</h4>
              <p className="text-xs text-[#FFD700]/70">Lagos</p>
            </div>
            <span className="font-bold text-[#FFD700]">42 inv</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
