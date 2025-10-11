// src/components/VideoCard.jsx
import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-md hover:shadow-blue-400/30 hover:scale-[1.02] transition-all">
      <video
        src={video.videoUrl}
        controls
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg">{video.title}</h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{video.description}</p>
        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>By {video.author}</span>
          <span>{new Date(video.timestamp?.toDate()).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
