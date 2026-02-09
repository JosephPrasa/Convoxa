import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

import HomePage from "./Pages/HomePage";
import Chatpage from "./Pages/Chatpage";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";


import ProfilePage from "./Pages/ProfilePage";
import DiscoverPage from "./Pages/DiscoverPage";
import PublicLandingPage from "./Pages/PublicLandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicLandingPage />} />
        <Route path="/auth" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/chats" element={<Chatpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
