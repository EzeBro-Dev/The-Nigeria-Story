import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const MyStory = () => {
  const { user, displayName } = useOutletContext();
  
  const [story, setStory] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. Fetch the existing story when the page loads (for display only)
  useEffect(() => {
    const fetchStory = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('stories')
          .select('content')
          .eq('user_id', user.id)
          .maybeSingle();

        if (data) {
          setStory(data.content);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [user]);

  // 2. The BULLETPROOF Save Function
  const handleSave = async (e) => {
    e.preventDefault();
    if (!story.trim()) {
      setMessage({ type: 'error', text: 'Your story cannot be empty.' });
      return;
    }

    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // STEP A: Ask the database right now, does this user already have a row?
      const { data: existingStory } = await supabase
        .from('stories')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      let saveError;

      if (existingStory) {
        // STEP B: If the row exists, forcefully UPDATE it
        const { error } = await supabase
          .from('stories')
          .update({ 
            content: story.trim(),
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id); // Target by user_id instead of story_id
        
        saveError = error;
      } else {
        // STEP C: If no row exists, INSERT a brand new one
        const { error } = await supabase
          .from('stories')
          .insert({ 
            user_id: user.id, 
            content: story.trim()
          });
          
        saveError = error;
      }

      if (saveError) throw saveError;

      setMessage({ type: 'success', text: 'Story saved successfully! 🎉' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);

    } catch (error) {
      console.error("Error saving story:", error);
      setMessage({ type: 'error', text: 'Failed to save story. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-zinc-400 animate-pulse">Loading your canvas...</div>;
  }

  return (
    <div className="p-8 flex flex-col gap-8 max-w-4xl text-white">
      <header>
        <h1 className="text-3xl font-bold mb-2">My Nigeria Story ✍️</h1>
        <p className="text-zinc-400 text-sm">
          Share your authentic experience. This will be featured on your public profile.
        </p>
      </header>

      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl p-8 shadow-lg">
        
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#FFD700]/15">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFE55C] to-[#D4AF37] text-black flex items-center justify-center text-xl font-bold shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-base font-bold m-0">{displayName}</h4>
            <p className="text-xs text-[#FFD700] mt-1">Author Mode</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-zinc-300">Your Story</label>
            <textarea 
              rows="12" 
              placeholder="Nigeria to me is..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-6 text-white text-base leading-relaxed focus:outline-none focus:border-[#FFD700]/50 transition-colors resize-y"
              required
            />
            <p className="text-xs text-zinc-500 text-right mt-1">
              {story.length} characters
            </p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl text-sm font-bold border ${message.type === 'success' ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-red-900/20 text-red-400 border-red-500/30'}`}>
              {message.text}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={isSaving}
              className={`px-8 py-3 rounded-xl font-bold text-black transition-all ${
                isSaving 
                  ? 'bg-zinc-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#FFE55C] to-[#D4AF37] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(255,215,0,0.3)]'
              }`}
            >
              {isSaving ? 'Saving...' : 'Publish Story'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default MyStory;