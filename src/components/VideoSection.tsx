import React from 'react';
import { Play } from 'lucide-react';

export function VideoSection() {
  return (
    <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden group">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/nApjogu5nlQ?si=XgUDdXq3f9BnepWW"
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
        <button className="bg-[#FFD700] p-6 rounded-full transform transition-all duration-300 group-hover:scale-110">
          <Play className="w-8 h-8 text-[#556B2F]" />
        </button>
      </div>
    </div>
  );
}
