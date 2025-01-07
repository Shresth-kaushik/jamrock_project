import React, { useState, useEffect } from 'react';
import { Car, Award, Gift } from 'lucide-react';

const backgroundImages = [
  "https://i.imgur.com/gHfP5jj.jpg",
  // "https://i.imgur.com/ZEpfF9B.jpg",
  // "https://i.imgur.com/iuIJqeS.jpg"
];

export function FeaturesSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 1000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-sm" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12 tracking-tight">
          Experience the Ultimate Prize
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Car className="w-16 h-16 text-[#FFD700]" />}
            title="Custom Tesla Model Y"
            description="Fully loaded with premium features and custom modifications."
          />
          <FeatureCard
            icon={<Award className="w-16 h-16 text-[#FFD700]" />}
            title="Guaranteed Winner"
            description="One lucky participant will definitely win this amazing prize."
          />
          <FeatureCard
            icon={<Gift className="w-16 h-16 text-[#FFD700]" />}
            title="Bonus Entries"
            description="Buy more tickets for better chances to win!"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/30 border border-white/10 shadow-lg">
      <div className="mb-6 relative flex justify-center items-center">
        <div className="absolute inset-0 bg-[#FFD700] opacity-30 rounded-full blur-xl" />
        <div className="relative">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-200 text-lg">{description}</p>
    </div>
  );
}

