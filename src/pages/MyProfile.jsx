import { useOutletContext } from 'react-router-dom';

const MyProfile = () => {
  const { user, displayName } = useOutletContext();

  return (
    <div className="p-8 flex flex-col gap-8 max-w-5xl">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">My Profile 👤</h1>
        <p className="text-zinc-400 text-sm">Manage your public persona on The Nigeria Story.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col - Avatar Card */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] text-black flex items-center justify-center text-5xl font-bold mb-4 shadow-[0_0_25px_rgba(255,215,0,0.3)]">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <button className="text-xs font-bold text-[#FFD700] hover:text-white transition-colors border border-[#FFD700]/30 rounded-full px-4 py-1.5 mb-6">
              Change Avatar
            </button>
            <h2 className="text-xl font-bold text-white break-words w-full">{displayName}</h2>
            <p className="text-sm text-zinc-400 mb-4 break-all">{user?.email}</p>
            <div className="w-full flex justify-between border-t border-white/5 pt-4 mt-2">
               <div className="text-center">
                 <p className="text-xs text-zinc-500">Invites</p>
                 <p className="font-bold text-white">42</p>
               </div>
               <div className="text-center border-l border-white/5 pl-4">
                 <p className="text-xs text-zinc-500">Views</p>
                 <p className="font-bold text-white">1.2k</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Col - Edit Form */}
        <div className="md:col-span-2">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold border-b border-[#FFD700]/15 pb-4 mb-6">Personal Information</h3>
            
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400 font-medium">Display Name</label>
                  <input type="text" defaultValue={displayName} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400 font-medium">Location (State/City)</label>
                  <input type="text" defaultValue="Lagos" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400 font-medium">Email Address</label>
                <input type="email" disabled defaultValue={user?.email} className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed" />
                <span className="text-xs text-zinc-500">Email cannot be changed directly for security reasons.</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400 font-medium">Short Bio</label>
                <textarea rows="4" placeholder="Tell the community a bit about yourself..." className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors"></textarea>
              </div>

              <div className="flex justify-end mt-4">
                <button type="button" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFE55C] to-[#D4AF37] text-black font-bold hover:shadow-[0_4px_20px_rgba(255,215,0,0.3)] transition-all">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;