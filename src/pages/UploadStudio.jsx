// src/pages/UploadStudio.jsx
import React, { useEffect, useRef, useState } from "react";

export default function UploadStudio() {
  const [type, setType] = useState("image");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevRef = useRef(null);

  useEffect(() => {
    return () => {
      if (prevRef.current) URL.revokeObjectURL(prevRef.current);
    };
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) { setFile(null); setPreview(null); return; }
    setFile(f);
    if (prevRef.current) URL.revokeObjectURL(prevRef.current);
    const url = URL.createObjectURL(f);
    prevRef.current = url;
    setPreview(url);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file first.");
    setUploading(true);
    setProgress(0);

    // Cloudinary upload (simple XHR for progress). Make sure preset/cloud name are correct.
    const CLOUD_NAME = "ddryt9alc";
    const UPLOAD_PRESET = "ml_default";
    const resource = type === "video" ? "video" : type === "raw" ? "raw" : "image";
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resource}/upload`;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
    };
    xhr.onload = () => {
      setUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        const json = JSON.parse(xhr.responseText);
        alert("Uploaded: " + (json.secure_url || json.url));
        setProgress(100);
      } else {
        console.error("Upload failed", xhr.responseText);
        alert("Upload failed. See console.");
      }
    };
    xhr.onerror = () => { setUploading(false); alert("Network error during upload."); };
    xhr.send(fd);
  };

  return (
    <div className="content-area">
      <div className="upload-card">
        <h2 className="section-heading">Upload Studio</h2>
        <p className="small-muted">Upload videos, photos, or articles. Collapse the Trending panel to get more space.</p>

        <form onSubmit={handleUpload} style={{ marginTop: 14 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["image", "video", "raw"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setType(opt)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: type === opt ? "linear-gradient(90deg,#00eaff,#7b2ff7)" : "rgba(255,255,255,0.03)",
                  color: type === opt ? "#04121a" : "#fff",
                  fontWeight: 700,
                }}
              >
                {opt === "image" ? "📸 Image" : opt === "video" ? "🎥 Video" : "📄 Other"}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 10 }}>
            <input type="file" accept={type === "video" ? "video/*" : type === "image" ? "image/*" : "*/*"} onChange={handleFileChange} />
          </div>

          {preview && (type === "image" ? (
            <img src={preview} alt="preview" style={{ width: "100%", borderRadius: 10, marginBottom: 10 }} />
          ) : (
            <video src={preview} controls style={{ width: "100%", borderRadius: 10, marginBottom: 10 }} />
          ))}

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" disabled={uploading} style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#00eaff,#7b2ff7)", fontWeight: 800, color: "#04121a", cursor: "pointer" }}>
              {uploading ? `Uploading ${progress}%` : "Upload"}
            </button>
            <button type="button" onClick={() => { setFile(null); setPreview(null); setProgress(0); }} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", background: "transparent", color: "#fff", cursor: "pointer" }}>
              Reset
            </button>
          </div>

          {uploading && <div style={{ marginTop: 10, height: 10, background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#00eaff,#7b2ff7)", borderRadius: 8 }} />
          </div>}
        </form>
      </div>
    </div>
  );
}
