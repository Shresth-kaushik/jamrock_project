import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setLoading(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black/90">
      <div 
        className="relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          loop
          muted={isMuted}
        >
          <source
            src="/merge_0653C1F5-FF1C-435B-BDFB-67EA72BA8522.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Large center play button */}
        <div 
          className={`absolute inset-0 flex items-center justify-center ${
            !isHovered && !isPlaying ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
        >
          <button
            onClick={togglePlay}
            className="bg-[#FFD700] p-8 rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-[#FFC700] shadow-lg"
          >
            <Play className="w-10 h-10 text-[#445829]" />
          </button>
        </div>

        {/* Bottom controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={togglePlay}
            className="bg-[#FFD700] p-3 rounded-full transform transition-all duration-300 hover:scale-105 hover:bg-[#FFC700] shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-[#445829]" />
            ) : (
              <Play className="w-6 h-6 text-[#445829]" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="bg-[#FFD700] p-3 rounded-full transform transition-all duration-300 hover:scale-105 hover:bg-[#FFC700] shadow-md"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-[#445829]" />
            ) : (
              <Volume2 className="w-6 h-6 text-[#445829]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

