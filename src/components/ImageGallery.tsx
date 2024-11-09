import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1674749960478-dc2fcda41f6f",
      caption: "Front View"
    },
    {
      url: "https://images.unsplash.com/photo-1491921125492-f0b9c835b699",
      caption: "Interior"
    },
    {
      url: "https://images.unsplash.com/photo-1632584028306-adc0a9d5a9b4",
      caption: "Rear View"
    },
    {
      url: "https://images.unsplash.com/photo-1670496137552-340a104a7ead",
      caption: "Side Profile"
    },
    {
      url: "https://images.unsplash.com/photo-1652509525608-6b44097ea5a7",
      caption: "Wheels"
    }
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-4 h-screen p-4">
        <div className="col-span-2 row-span-2 relative group">
          <img
            src={images[currentIndex].url}
            className="w-full h-full object-cover cursor-pointer rounded-xl shadow-lg"
            alt={images[currentIndex].caption}
            onClick={() => setIsModalOpen(true)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-4 rounded-xl">
            <button
              onClick={prevImage}
              className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
            <img
              src={image.url}
              className="w-full h-full object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-300"
              alt={image.caption}
              onClick={() => {
                setCurrentIndex(index + 1);
                setIsModalOpen(true);
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
             onClick={() => setIsModalOpen(false)}>
          <div className="relative max-w-4xl mx-auto">
            <img
              src={images[currentIndex].url}
              className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
              alt={images[currentIndex].caption}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}