import React, { useRef, useState, useEffect } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

export function ImageGallery() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = volume;
      video.muted = isMuted;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        autoPlay
        playsInline
        muted={isMuted}
      >
        <source src="https://i.imgur.com/cunjRHj.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-4 left-4 z-50 flex items-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors transform hover:scale-110 active:scale-90"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-full p-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white rounded-lg appearance-none cursor-pointer"
            aria-label="Adjust volume"
          />
          <button
            onClick={toggleMute}
            className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors transform hover:scale-110 active:scale-90"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}

