import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  title?: string;
  urlInput: string;
  heightInput: number;
  widthInput: number;
  subtitlesInput: string;
  setQuality: any;
  videoTimeInput: number;
  setVideoTime: any;
}

const VideoPlayer = ({ 
  title, 
  urlInput, 
  heightInput, 
  widthInput, 
  subtitlesInput, 
  setQuality, 
  videoTimeInput, 
  setVideoTime 
}: VideoPlayerProps) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlayPause() {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function extractYouTubeParams(urlInput: string) {
    const regex = /[?&]v=([a-zA-Z0-9_-]+).*?[&]?t=([0-9]+)s?/;
    const match = urlInput.match(regex);
    if (match) {
      const videoId = match[1];
      const timeInSeconds = match[2] ? parseInt(match[2]) : null;
      return { videoId, timeInSeconds };
    }
    return null;
  }

  const isYouTubeUrl = (url: string) => {
    const regex = /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/;
    return regex.test(url);
  };

  if (isYouTubeUrl(urlInput)) {
    const { videoId } = extractYouTubeParams(urlInput) || {};
    const newUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div className="relative w-full">
        <iframe
          width={widthInput}
          height={heightInput}
          className="rounded-lg shadow-lg h-[80vh]"
          src={newUrl}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div className="relative w-full flex justify-center items-center bg-black rounded-lg shadow-lg ">
      <video
        ref={videoRef}
        width={widthInput}
        height={heightInput}
        className="rounded-lg"
        controls={false} // Disable default controls
        onTimeUpdate={(e) => setVideoTime(e.currentTarget.currentTime)}
      >
        <source src={urlInput} type="video/mp4" />
        {subtitlesInput && <track kind="subtitles" src={subtitlesInput} />}
        
      </video>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-red-400 z-50">
        <button 
          onClick={togglePlayPause} 
          className="text-white p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button 
          onClick={togglePlayPause} 
          className="text-white p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button 
          onClick={togglePlayPause} 
          className="text-white p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {/* Add additional custom controls like volume, full-screen, etc. */}
      </div>

      {/* Custom Controls */}
      
    </div>
  );
};

export default VideoPlayer;
