import React, { useState } from "react";
import axios from "axios";

const UploadModal = ({ setShowUpload, user }) => {
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState("video");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddryt9alc/upload";
  const UPLOAD_PRESET = "ml_default";

  const handleUpload = async () => {
    if (!file || !user) return alert("Please sign in and choose a file!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      await axios.post(CLOUDINARY_URL, formData);
      alert("✅ Upload successful!");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed.");
    } finally {
      setLoading(false);
      setShowUpload(false);
    }
  };

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <h2>Upload to T-M-B-S Studio</h2>
        <select value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
          <option value="video">🎬 Video</option>
          <option value="photo">📸 Photo</option>
          <option value="article">📝 Article</option>
        </select>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" onChange={(e) => setDesc(e.target.value)} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        <button className="cancel-btn" onClick={() => setShowUpload(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadModal;
