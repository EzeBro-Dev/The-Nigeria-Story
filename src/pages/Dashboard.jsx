import '../styles/Dashboard.css'

const Dashboard = () => {

  return (
    <>
      <section className="dashboard">
        <div className="dashboard-nav">
          <div className="id">
            <div className="id-logo">
              <h2>AI</h2>
            </div>
            <div className="id-text">
              <h2>Amina Ibrahim</h2>
              <p>Lagos . Designer</p>
              <span>✦ Story Contributor</span>
            </div>
          </div>
          <div className="options">
            <h3>Main</h3>
            <div>
              <button>
                <span>🏠</span>
                <span>Dashboard</span>
              </button>
              <button>
                <span>👤</span>
                <span>My Profile</span>
              </button>
              <button>
                <span>🎨</span>
                <span>My Portrait</span>
              </button>
              <button>
                <span>✍️</span>
                <span>My Story</span>
              </button>
            </div>
          </div>
          <div className="options">
            <h3>Movement</h3>
            <div>
              <button>
                <span>🏆</span>
                <span>Leaderboard</span>
              </button>
              <button>
                <span>📖</span>
                <span>Stories</span>
              </button>
              <button>
                <span>👥</span>
                <span>My Invites</span>
              </button>
            </div>
          </div>
          <div className="options">
            <h3>Learn</h3>
            <div>
              <button>
                <span>🎬</span>
                <span>Animation Hub</span>
              </button>
              <button>
                <span>📡</span>
                <span>Live Classes</span>
              </button>
              <button>
                <span>🎞️</span>
                <span>Video Courses</span>
              </button>
              <button>
                <span>💬</span>
                <span>Community</span>
              </button>
            </div>
          </div>
          <div className="options">
            <h3>Account</h3>
            <div>
              <button>
                <span>⚙️</span>
                <span>Settings</span>
              </button>
              <button>
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="welcome">
            <div className="welcome-text">
              <h2>Welcome back, Amina 👋</h2>
              <p>You joined on March 15, 2026 · Participant #4,231</p>
            </div>
            <div className="welcome-btn">
              <button>📋 Copy Profile Link</button>
              <button>Upgrade Tier</button>
            </div>
          </div>

          <div className="rank-container">
            <div className="rank">
              <p>RANK</p>
              <h2>#4,231</h2>
              <span>↑ 312 places this week</span>
            </div>
            <div className="rank">
              <p>FRIENDS INVITED</p>
              <h2>42</h2>
              <span>↑ 8 this week</span>
            </div>
            <div className="rank">
              <p>JOINED VIA MY LINK</p>
              <h2>18</h2>
              <span>↑ 3 today</span>
            </div>
            <div className="rank">
              <p>PROFILE VIEWS</p>
              <h2>1,204</h2>
              <span>↑ 24% this week</span>
            </div>
          </div>

          <div className="entry">
            <div className="entry-first">
              <div className="first-sec">
                <p>My Entry</p>
                <p>View Profile →</p>
              </div>
              <div>
                <div className="first-id">
                  <div className="first-id-logo">
                    <h2>👩🏿</h2>
                  </div>
                  <div className="first-id-text">
                    <h2>Amina Ibrahim</h2>
                    <p>Lagos . Designer</p>
                    <span>✦ Story Contributor</span>
                  </div>
                </div>
                <div className="first-story">
                  <p>My Nigeria Story</p>
                  <p>
                    "Nigeria to me is pure resilience. It's the vibrant colors
                    in our markets, the unending hustle in Lagos, and the warmth
                    of community that never fades..."
                  </p>
                </div>
                <div className="first-share">
                  <p>My Shareable Profile Link</p>
                  <div className="share-link">
                    <p>thenigeriastory.com/profile/amina-ibrahim</p>
                    <button>Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="second-sec">
            <div>
              <div className="second-rank">
                <p>My Ranking</p>
                <p>Top 2%</p>
              </div>
              <div className="second-board">
                <h2>#4,231</h2>
                <p>out of 257,000 participants</p>
                <p>
                  <span>↑ 312 places</span> this week
                </p>
              </div>
              <div className="second-people">
                <p>People Near You</p>
                <div className="people-div">
                  <div>
                    <span>#4,229</span>
                    <h3 className="people-fir">KA</h3>
                    <p>Kemi A. — Ibadan</p>
                  </div>
                  <span>44 inv</span>
                </div>
                <div className="people-div">
                  <div>
                    <span>#4,231</span>
                    <h3 className="people-sec">AI</h3>
                    <p>You — Lagos</p>
                  </div>
                  <span>42 inv</span>
                </div>
                <div className="people-div">
                  <div>
                    <span>#4,234</span>
                    <h3 className="people-thi">TO</h3>
                    <p>Tola O. — Lagos</p>
                  </div>
                  <span>40 inv</span>
                </div>
              </div>
              <p className="second-inv">
                Invite <span>2 more people</span> to break into the{" "}
                <span>Top 1%</span>
              </p>
            </div>

            <div className="third-cont">
              <div className="third-not">
                <p>Notifications</p>
                <p>4 new</p>
              </div>
              <div className="third-not-sec">
                <div className="third-not-cont">
                  <div>
                    <p className="third-fir">🎉</p>
                  </div>
                  <div>
                    <p>Chinedu joined via your link!</p>
                    <span>2 minutes ago</span>
                  </div>
                </div>
                <div className="third-not-cont">
                  <div>
                    <p className="third-sec">📡</p>
                  </div>
                  <div>
                    <p>Live class starting in 30 mins</p>
                    <span>Animation Hub Nigeria · Today 4pm</span>
                  </div>
                </div>
                <div className="third-not-cont">
                  <div>
                    <p className="third-thi">🏆</p>
                  </div>
                  <div>
                    <p>You moved up 50 places!</p>
                    <span>Now ranked #4,231</span>
                  </div>
                </div>
                <div className="third-not-cont-1">
                  <div>
                    <p className="third-fou">❤</p>
                  </div>
                  <div>
                    <p>3 people liked your story</p>
                    <span>Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Dashboard