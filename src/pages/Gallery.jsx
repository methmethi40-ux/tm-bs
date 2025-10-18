import React, { useEffect, useState } from "react";
import "./Gallery.css";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://your-server.onrender.com"; // your backend URL

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const resp = await fetch(`${API_BASE}/api/media`);
        if (!resp.ok) throw new Error(`HTTP error! Status: ${resp.status}`);
        const json = await resp.json();
        setItems(json.resources || []);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  return (
    <div className="gallery">
      <h2>Global Gallery</h2>
      {loading && <p>Loading…</p>}
      <div className="media-grid">
        {items.map((m) => (
          <div key={m.asset_id} className="media-item">
            {m.resource_type === "video" ? (
              <video controls src={m.secure_url} />
            ) : (
              <img src={m.secure_url} alt={m.public_id} />
            )}
            <div className="meta">
              <div className="title">{m.public_id.split("/").pop()}</div>
              <div className="date">{new Date(m.created_at).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
