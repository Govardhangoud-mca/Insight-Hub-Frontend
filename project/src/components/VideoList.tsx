import React, { useState, useEffect } from "react";

interface VideoItem {
  id: number;
  title: string;
}

interface VideoListProps {
  unitId?: number;
}

const VideoList: React.FC<VideoListProps> = ({ unitId }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    if (!unitId) {
      console.error("VideoList Error: unitId is undefined!");
      return;
    }

    fetch(`https://insight-hub-server-production.up.railway.app/api/units/${unitId}/videos`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Videos:", data); // Debugging API response
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error("Unexpected API response:", data);
          setVideos([]);
        }
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, [unitId]);

  return (
    <div>
      <h4 className="font-semibold">Videos:</h4>
      {videos.length > 0 ? (
        videos.map((video) =>
          video.title ? (
            <p key={video.id} className="text-gray-700">{video.title}</p>
          ) : (
            <p key={video.id} className="text-red-500">Title not found</p>
          )
        )
      ) : (
        <p className="text-gray-500">No videos available.</p>
      )}
    </div>
  );
};

export default VideoList;
