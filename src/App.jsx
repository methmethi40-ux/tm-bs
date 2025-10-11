import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import RightSidebar from "./components/RightSidebar";
import UploadStudio from "./pages/UploadStudio";

function App() {
  const [activeSection, setActiveSection] = useState("videos");

  const renderSection = () => {
    switch (activeSection) {
      case "videos":
        return (
          <div className="section-content">
            <h2>🎥 Videos</h2>
            <p>Discover amazing tech videos and futuristic productions.</p>
          </div>
        );
      case "photos":
        return (
          <div className="section-content">
            <h2>📸 Photos</h2>
            <p>Explore stunning photography and creative visuals.</p>
          </div>
        );
      case "articles":
        return (
          <div className="section-content">
            <h2>📝 Articles</h2>
            <p>Read deep insights about innovation, robotics, and design.</p>
          </div>
        );
      case "upload":
        return <UploadStudio />;
      default:
        return (
          <div className="section-content">
            <h2>Welcome to T-M-B-S Producers</h2>
            <p>Explore futuristic creativity — powered by tech aura ✨</p>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar onNavigate={setActiveSection} />

      {/* Main Content */}
      <div className="main-content">
        <Navbar onUploadClick={() => setActiveSection("upload")} />
        <div className="content-area">{renderSection()}</div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}

export default App;
