const Settings = () => {
  return (
    <div className="p-8 flex flex-col gap-8 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings ⚙️</h1>
        <p className="text-zinc-400 text-sm">Manage your preferences and security.</p>
      </header>

      {/* Preferences Section */}
      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg flex flex-col gap-6">
        <h3 className="text-lg font-bold border-b border-[#FFD700]/15 pb-4">Notifications</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white">Email Updates</h4>
            <p className="text-sm text-zinc-400">Receive emails about new stories and project updates.</p>
          </div>
          {/* Custom Toggle Switch (Tailwind) */}
          <div className="w-12 h-6 bg-[#FFD700] rounded-full flex items-center p-1 cursor-pointer">
            <div className="w-4 h-4 bg-black rounded-full transform translate-x-6 transition-transform"></div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-6">
          <div>
            <h4 className="font-bold text-white">Leaderboard Alerts</h4>
            <p className="text-sm text-zinc-400">Get notified when someone passes your rank.</p>
          </div>
          <div className="w-12 h-6 bg-white/10 rounded-full flex items-center p-1 cursor-pointer">
            <div className="w-4 h-4 bg-zinc-400 rounded-full transition-transform"></div>
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-6 shadow-lg flex flex-col gap-6">
        <h3 className="text-lg font-bold border-b border-[#FFD700]/15 pb-4">Privacy</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white">Public Profile</h4>
            <p className="text-sm text-zinc-400">Allow your story and rank to be viewed via your public link.</p>
          </div>
          <div className="w-12 h-6 bg-[#FFD700] rounded-full flex items-center p-1 cursor-pointer">
            <div className="w-4 h-4 bg-black rounded-full transform translate-x-6 transition-transform"></div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-950/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 shadow-lg flex flex-col gap-6 mt-4">
        <h3 className="text-lg font-bold text-red-500 border-b border-red-500/30 pb-4">Danger Zone</h3>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h4 className="font-bold text-white">Delete Account</h4>
            <p className="text-sm text-zinc-400">Permanently delete your account, story, and all associated data.</p>
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all font-bold text-sm">
            Delete My Account
          </button>
        </div>
      </div>

    </div>
  );
};

export default Settings;