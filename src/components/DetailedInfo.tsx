import React from 'react';
import { Car, Battery, Zap, Timer, Award } from 'lucide-react';

export function DetailedInfo() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-white">Tesla Model Y Features</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Battery className="w-6 h-6 text-[#FFD700]" />
            <div>
              <h4 className="text-white font-semibold">Long Range Battery</h4>
              <p className="text-gray-300">Up to 330 miles of estimated range</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Zap className="w-6 h-6 text-[#FFD700]" />
            <div>
              <h4 className="text-white font-semibold">Quick Acceleration</h4>
              <p className="text-gray-300">0-60 mph in just 4.8 seconds</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Timer className="w-6 h-6 text-[#FFD700]" />
            <div>
              <h4 className="text-white font-semibold">Fast Charging</h4>
              <p className="text-gray-300">Supercharging up to 250 kW</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-white">Raffle Details</h3>
        <div className="prose prose-invert">
          <p className="text-gray-300">
            Enter for your chance to win this custom Tesla Model Y, featuring premium upgrades and
            modifications. The winner will receive:
          </p>
          <ul className="text-gray-300 list-disc pl-4 space-y-2">
            <li>2024 Tesla Model Y Long Range</li>
            <li>Custom exterior wrap</li>
            <li>Premium interior package</li>
            <li>Enhanced Autopilot</li>
            <li>All taxes paid</li>
          </ul>
          <p className="text-gray-300 mt-4">
            Don't miss out on this incredible opportunity to own one of the most sought-after
            electric vehicles on the market, customized to perfection.
          </p>
        </div>
      </div>
    </div>
  );
}