import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function CountdownTimer() {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 2, 29); // March is 2 (0-indexed)
    if (targetDate <= now) {
      targetDate.setFullYear(targetDate.getFullYear() + 1);
    }
    const difference = +targetDate - +now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="animate-pulse mb-8">
        <Clock className="w-16 h-16 text-[#FFD700]" />
      </div>
      <div className="flex gap-4 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} 
               className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[100px] transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
            <div className="text-[#FFD700] text-4xl font-bold animate-[bounce_1s_ease-in-out_infinite]">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-white text-sm uppercase">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

