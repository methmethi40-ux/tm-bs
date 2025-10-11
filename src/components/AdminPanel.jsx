// src/components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'linear-gradient(90deg, #007bff, #00d4ff)',
      border: 'none',
      borderRadius: '12px',
      color: '#fff',
      padding: '10px 18px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: '0.3s',
    }}
    onMouseOver={(e) => (e.target.style.opacity = 0.8)}
    onMouseOut={(e) => (e.target.style.opacity = 1)}
  >
    {children}
  </button>
);




const AdminPanel = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, "videos"));
      setVideos(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchVideos();
  }, []);

  const deleteVideo = async (id) => {
    await deleteDoc(doc(db, "videos", id));
    setVideos(videos.filter((v) => v.id !== id));
  };

  return (
    <div className="p-6 bg-gray-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
            <p className="text-gray-400 mb-4">{video.description}</p>
            <Button
              onClick={() => deleteVideo(video.id)}
              className="bg-red-600 hover:bg-red-700 w-full"
            >
              Delete Video
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
