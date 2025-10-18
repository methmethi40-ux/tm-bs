import React, { useState, useEffect } from "react";
import "./UploadStudio.css";

export default function UploadStudio() {
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState("image");
  const [channel, setChannel] = useState("");
  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("channels")) || [];
    setChannels(saved);
  }, []);

  const addChannel = () => {
    if (!newChannel.trim()) return alert("Enter a channel name");
    const updated = [...channels, newChannel];
    localStorage.setItem("channels", JSON.stringify(updated));
    setChannels(updated);
    setNewChannel("");
  };

  const handleUpload = () => {
    if (!file && !content) return alert("Please add content");
    if (!channel) return alert("Please select a channel");

    const reader = new FileReader();
    reader.onload = () => {
      const uploads = JSON.parse(localStorage.getItem("uploads")) || [];
      const newUpload = {
        id: Date.now(),
        type: uploadType,
        channel,
        file: uploadType === "article" ? content : reader.result,
        name: file ? file.name : "Article",
        likes: 0,
        lovers: 0,
        comments: [],
      };
      uploads.push(newUpload);
      localStorage.setItem("uploads", JSON.stringify(uploads));
      alert("✅ Uploaded!");
      setFile(null);
      setContent("");
    };
    if (uploadType === "article") reader.onload(); 
    else reader.readAsDataURL(file);
  };

  return (
    <div className="upload-page">
      <h2>🎬 Upload Studio</h2>

      <div className="upload-box">
        <select value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="article">Article</option>
        </select>

        <select value={channel} onChange={(e) => setChannel(e.target.value)}>
          <option value="">Select Channel</option>
          {channels.map((ch, i) => (
            <option key={i}>{ch}</option>
          ))}
        </select>

        <div className="channel-add">
          <input
            type="text"
            placeholder="New Channel"
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
          />
          <button onClick={addChannel}>➕</button>
        </div>

        {uploadType !== "article" ? (
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        ) : (
          <textarea
            placeholder="Write your article..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        )}

        <button className="upload-btn" onClick={handleUpload}>
          🚀 Upload
        </button>
      </div>
    </div>
  );
}
