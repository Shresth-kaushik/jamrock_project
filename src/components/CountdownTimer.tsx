import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
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