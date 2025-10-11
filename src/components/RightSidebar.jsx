// src/components/RightSidebar.jsx
import React, { useState } from "react";

export default function RightSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const width = collapsed ? 64 : 320;
  const containerStyle = {
    width,
    transition: "width 260ms cubic-bezier(.2,.9,.2,1)",
    background: "linear-gradient(180deg, rgba(6,8,14,0.98), rgba(10,12,20,0.95))",
    color: "white",
    padding: collapsed ? "12px 6px" : "18px",
    boxSizing: "border-box",
    borderLeft: "1px solid rgba(255,255,255,0.03)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    height: "100vh",
    overflowY: "auto",
    zIndex: 40,
  };

  const toggleStyle = {
    alignSelf: collapsed ? "center" : "flex-end",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.8)",
    padding: "6px 8px",
    borderRadius: 8,
  };

  const topics = ["AI Music", "Robotics", "Digital Art", "Web Dev", "Cinematic"];

  return (
    <aside style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {!collapsed ? <h3 style={{ margin: 0, color: "#9ff9ff" }}>Trending</h3> : <div />}
        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((s) => !s)}
          style={toggleStyle}
        >
          {collapsed ? "⮞" : "⮜"}
        </button>
      </div>

      {!collapsed ? (
        <>
          <div>
            {topics.map((t) => (
              <div
                key={t}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  padding: "10px",
                  borderRadius: 10,
                  marginBottom: 10,
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: 700 }}>{t}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", marginTop: 6, fontSize: 13 }}>
                  Trending now — top creators and latest uploads.
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8 }}>
            <h4 style={{ margin: "10px 0 8px 0", color: "#cfefff" }}>Suggested Creators</h4>
            {["Meth Methi", "Aria Nova", "TechAura AI"].map((name) => (
              <div key={name} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "linear-gradient(90deg,#00eaff,#7b2ff7)" }} />
                <div style={{ fontWeight: 700 }}>{name}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", paddingTop: 6 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Tips</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
              Use high quality thumbnails, add captions for accessibility, and tag your uploads with categories.
            </div>
          </div>
        </>
      ) : (
        // collapsed view: show only icons or vertical small list
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          {topics.map((t) => (
            <div key={t} title={t} style={{ fontSize: 12, padding: 6, opacity: 0.9 }}>
              🔥
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
