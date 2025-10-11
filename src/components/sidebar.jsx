import React from "react";
import "./Sidebar.css";

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">T-M-B-S</h2>
      <nav>
        <ul>
          <li onClick={() => onNavigate("videos")}>🎥 Videos</li>
          <li onClick={() => onNavigate("photos")}>📸 Photos</li>
          <li onClick={() => onNavigate("articles")}>📝 Articles</li>
          <li onClick={() => onNavigate("upload")}>⬆️ Upload Studio</li>
          <li onClick={() => onNavigate("admins")}>⚙️ Admin</li>
        </ul>
      </nav>
    </aside>
  );
}
