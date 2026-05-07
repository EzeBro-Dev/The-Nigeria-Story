import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if a user is logged in
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // If no session, kick them back to the login page
        navigate('/');
      } else {
        // Save the user data to state
        setUser(session.user);
        setLoading(false);
      }
    };

    getUser();

    // 2. Listen for changes (like if they log out in another tab)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // 3. Handle the Sign Out button
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div style={{ color: 'white', padding: '2rem' }}>Loading your dashboard...</div>;
  }

  // Extract a username from the email or Google profile
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Contributor";

  return (
    <>
      <section className="dashboard">
        <div className="dashboard-nav">
          <div className="id">
            <div className="id-logo">
              <h2>{displayName.charAt(0).toUpperCase()}</h2>
            </div>
            <div className="id-text">
              <h2>{displayName}</h2>
              <p>{user?.email}</p>
              <span>✦ Story Contributor</span>
            </div>
          </div>
          
          {/* ... (Keep all your existing nav options up to 'Account') ... */}
          
          <div className="options">
            <h3>Account</h3>
            <div>
              <button>
                <span>⚙️</span>
                <span>Settings</span>
              </button>
              {/* Wire up the Sign Out button here */}
              <button onClick={handleSignOut}>
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="welcome">
            <div className="welcome-text">
              <h2>Welcome back, {displayName} 👋</h2>
              <p>You joined on {new Date(user?.created_at).toLocaleDateString()} · Participant #...</p>
            </div>
            <div className="welcome-btn">
              <button>📋 Copy Profile Link</button>
              <button>Upgrade Tier</button>
            </div>
          </div>

          {/* ... (Keep the rest of your dashboard UI exactly as it is for now) ... */}
          
        </div>
      </section>
    </>
  );
}

export default Dashboard;
