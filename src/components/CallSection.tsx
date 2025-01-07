import React from 'react';

const backgroundImages = [
  "https://i.imgur.com/tXzeznZ.jpg",
  "https://i.imgur.com/2d6sa1O.jpg"
];

export function CallSection() {
  return (
    <section id="call" className="relative py-20 overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full flex items-center justify-center">
          {backgroundImages.map((image, index) => (
            <div
              key={image}
              className="w-1/2 h-3/4 bg-cover bg-center m-2 rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-6 shadow-text">
            24/7 AI Customer Service
          </h2>
          <div className="text-2xl text-gray-300 max-w-2xl mx-auto shadow-text">
            <span className="text-gray-100">Call Now:</span>
            <a
              href="tel:+18508202550"
              className="text-[#FFD700] pl-2 font-bold hover:underline transition-all duration-300"
            >
              +1 (850) 820-2550
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
}

