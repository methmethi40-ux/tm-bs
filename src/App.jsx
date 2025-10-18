import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadStudio from "./pages/UploadStudio";
import Gallery from "./pages/Gallery";


export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Upload</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UploadStudio />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
 

}
