import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import RegistrationForm from "./pages/RegistrationForm";
import TournamentDetails from "./pages/TournamentDetails";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import PlayerProfiles from "./pages/PlayerProfiles";
import Contact from "./pages/Contact";
import EquipmentShop from "./pages/EquipmentShop";
import TrainingAndCoaching from "./pages/TrainingAndCoaching";
import JobsAndVolunteers from "./pages/JobsAndVolunteers";
import TeamRegistration from "./pages/TeamRegistration";
import AboutUs from "./pages/AboutUs";

const titleMap = {
  "/": "XYZ Organization",
  "/register": "Registration",
  "/tournaments": "Tournaments",
  "/gallery": "Gallery",
  "/blog": "Latest Cricket Blogs",
  "/players": "Top Player Profiles",
  "/contact": "Contact Us",
  "/shop": "Cricket Equipment Shop",
  "/training": "Training & Coaching Programs",
  "/jobs": "Jobs & Volunteer Opportunities",
  "/team-registration": "Team Registration",
  "/about": "About Us",
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-green-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/tournaments" element={<TournamentDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/players" element={<PlayerProfiles />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<EquipmentShop />} />
            <Route path="/training" element={<TrainingAndCoaching />} />
            <Route path="/jobs" element={<JobsAndVolunteers />} />
            <Route path="/team-registration" element={<TeamRegistration />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
        <ChangeTitle />
      </div>
    </Router>
  );
}

function ChangeTitle() {
  const location = useLocation();

  useEffect(() => {
    document.title = titleMap[location.pathname] || "Default Title";
  }, [location]);

  return null;
}

export default App;
