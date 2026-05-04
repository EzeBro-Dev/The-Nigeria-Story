import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import MyStory from "./pages/MyStory";
import Leaderboard from './pages/Leaderboard';
import MyProfile from './pages/MyProfile';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* The 'index' route loads automatically at /dashboard */}
          <Route index element={<DashboardHome />} /> 
          <Route path="story" element={<MyStory />} />
          <Route path="leaderboard" element={<Leaderboard />} />
<Route path="profile" element={<MyProfile />} />
<Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
