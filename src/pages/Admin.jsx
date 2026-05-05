import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Admin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filter, setFilter] = useState('pending'); // Default to showing pending apps

  // Derived Stats
  const totalApps = applications.length;
  const approvedApps = applications.filter(a => a.status === 'approved').length;
  const pendingApps = applications.filter(a => a.status === 'pending').length;

  useEffect(() => {
    const fetchAdminData = async () => {
      const { data: apps, error } = await supabase
        .from('applications')
        .select(`
          *,
          profiles (display_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) console.error("Fetch error:", error); // Helpful for debugging!
      
      setApplications(apps || []);
      setLoading(false);
    };

    fetchAdminData();
  }, []);

  const updateStatus = async (appId, newStatus) => {
    const { error } = await supabase
      .from('applications')
      .update({ status: newStatus })
      .eq('id', appId);

    if (!error) {
      setApplications(apps => apps.map(app => app.id === appId ? { ...app, status: newStatus } : app));
      setSelectedApp(null);
    } else {
      alert("Failed to update status.");
    }
  };

  // Filter the list based on the selected tab
  const filteredApps = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  if (loading) return <div className="text-zinc-400 p-8 animate-pulse">Loading Command Center...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 pb-12 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f19d00] to-[#FFE55C]">
          Command Center
        </h1>
        <p className="text-zinc-400 mt-2">Manage Cohort 1 Applications</p>
      </header>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1">Total Applicants</h3>
          <p className="text-3xl font-black text-white">{totalApps}</p>
        </div>
        <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(255,215,0,0.05)]">
          <h3 className="text-[#FFD700] text-sm font-bold uppercase tracking-wider mb-1">Pending Review</h3>
          <p className="text-3xl font-black text-[#FFD700]">{pendingApps}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(34,197,94,0.05)]">
          <h3 className="text-green-400 text-sm font-bold uppercase tracking-wider mb-1">Approved Scholars</h3>
          <p className="text-3xl font-black text-green-400">{approvedApps}</p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {['pending', 'approved', 'rejected', 'all'].map((statusOption) => (
          <button
            key={statusOption}
            onClick={() => setFilter(statusOption)}
            className={`px-5 py-2 rounded-xl text-sm font-bold capitalize whitespace-nowrap transition-all ${
              filter === statusOption 
              ? 'bg-white text-black shadow-md' 
              : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {statusOption} ({statusOption === 'all' ? totalApps : statusOption === 'pending' ? pendingApps : statusOption === 'approved' ? approvedApps : applications.length - approvedApps - pendingApps})
          </button>
        ))}
      </div>

      {/* MOBILE VIEW: Tappable Cards */}
      <div className="md:hidden space-y-4">
        {filteredApps.map((app) => (
          <div 
            key={app.id} 
            onClick={() => setSelectedApp(app)}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${
              app.status === 'approved' ? 'bg-green-500' : 
              app.status === 'rejected' ? 'bg-red-500' : 'bg-[#FFD700]'
            }`}></div>
            
            <div className="flex items-center gap-3 mb-4 pl-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold border border-white/10">
                {app.profiles?.display_name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <h4 className="font-bold text-white leading-tight">{app.profiles?.display_name || 'Unknown Applicant'}</h4>
                <p className="text-zinc-500 text-xs">{app.age} yrs • <span className="capitalize">{app.gender}</span></p>
              </div>
            </div>

            <div className="flex justify-between items-center pl-2">
              <span className="text-[10px] font-bold bg-white/10 text-zinc-300 px-2 py-1 rounded tracking-wider">
                {app.scholarship_type.toUpperCase()} SCHOLARSHIP
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                app.status === 'approved' ? 'bg-green-500/20 text-green-400' : 
                app.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-[#FFD700]/20 text-[#FFD700]'
              }`}>
                {app.status}
              </span>
            </div>
          </div>
        ))}
        {filteredApps.length === 0 && <p className="text-zinc-500 text-center py-8 bg-white/5 rounded-2xl border border-white/5 border-dashed">No applications found in this category.</p>}
      </div>

      {/* DESKTOP VIEW: Sleek Table */}
      <div className="hidden md:block bg-[#1a1a1a]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/60 border-b border-white/5">
              <th className="p-5 text-xs text-zinc-500 font-bold uppercase tracking-wider">Applicant</th>
              <th className="p-5 text-xs text-zinc-500 font-bold uppercase tracking-wider">Details</th>
              <th className="p-5 text-xs text-zinc-500 font-bold uppercase tracking-wider">Scholarship</th>
              <th className="p-5 text-xs text-zinc-500 font-bold uppercase tracking-wider">Status</th>
              <th className="p-5 text-xs text-zinc-500 font-bold uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => (
              <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-xs text-white font-bold border border-white/10 shadow-sm">
                      {app.profiles?.display_name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{app.profiles?.display_name || 'Unknown'}</div>
                      <div className="text-xs text-zinc-500">{new Date(app.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="text-sm text-zinc-300">{app.age} yrs • <span className="capitalize">{app.gender}</span></div>
                </td>
                <td className="p-5">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${app.scholarship_type === 'full' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'}`}>
                    {app.scholarship_type.toUpperCase()}
                  </span>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === 'approved' ? 'bg-green-500/20 text-green-400' : 
                    app.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 
                    'bg-[#FFD700]/20 text-[#FFD700]'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button 
                    onClick={() => setSelectedApp(app)}
                    className="px-4 py-2 bg-white/10 border border-white/10 hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-black rounded-lg text-sm font-bold transition-all shadow-sm opacity-60 group-hover:opacity-100"
                  >
                    Review Essay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredApps.length === 0 && (
          <div className="p-16 flex flex-col items-center justify-center text-zinc-500">
            <span className="text-4xl mb-4">📭</span>
            <p className="font-medium">No applications match this filter.</p>
          </div>
        )}
      </div>

      {/* BEAUTIFUL REVIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#FFD700]/30 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(241,157,0,0.15)] animate-fade-in">
            
            {/* Modal Header with User Info */}
            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] flex items-center justify-center text-xl text-black font-black shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                  {selectedApp.profiles?.display_name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{selectedApp.profiles?.display_name || 'Applicant'}</h2>
                  <p className="text-zinc-400 text-sm">{selectedApp.age} years old • <span className="capitalize">{selectedApp.gender}</span></p>
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-zinc-500 hover:text-white p-2 bg-white/5 rounded-full transition-colors">
                ✕
              </button>
            </div>
            
            <div className="mb-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-inner">
              <h3 className="text-[#FFD700] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span>🔥</span> Core Passion
              </h3>
              <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {selectedApp.passion}
              </p>
            </div>

            <div className="mb-8 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-inner">
              <h3 className="text-[#FFD700] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span>🎓</span> {selectedApp.scholarship_type} Scholarship Request
              </h3>
              <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {selectedApp.scholarship_reason}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 border-t border-white/10 pt-6">
              {selectedApp.status !== 'approved' && (
                <button 
                  onClick={() => updateStatus(selectedApp.id, 'approved')}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:-translate-y-1"
                >
                  Approve Scholar
                </button>
              )}
              {selectedApp.status !== 'rejected' && (
                <button 
                  onClick={() => updateStatus(selectedApp.id, 'rejected')}
                  className="flex-1 bg-white/5 hover:bg-red-500/10 text-zinc-300 hover:text-red-400 font-bold py-4 rounded-xl transition-colors border border-white/10 hover:border-red-500/30"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;