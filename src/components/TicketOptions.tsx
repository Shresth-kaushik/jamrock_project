import React, { useState } from 'react';
import { Ticket, Gift, Star } from 'lucide-react';
import { PurchaseForm } from './PurchaseForm';
import { Toaster } from 'react-hot-toast';

export function TicketOptions() {
  const [selectedOption, setSelectedOption] = useState<null | {
    amount: number;
    price: number;
  }>(null);

  const ticketOptions = [
    { amount: 20, price: 100, bonus: 20, popular: true },
    { amount: 50, price: 250, bonus: 50, popular: false }
  ];

  return (
    <>
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {ticketOptions.map((option, index) => (
          <div
            key={index}
            className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 ${
              option.popular ? 'ring-2 ring-[#FFD700]' : ''
            }`}
          >
            {option.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FFD700] text-[#556B2F] px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Star className="w-4 h-4" /> Most Popular
                </span>
              </div>
            )}
            
            <div className="flex justify-center mb-4">
              <Ticket className="w-12 h-12 text-[#FFD700]" />
            </div>
            
            <div className="text-4xl font-bold text-white mb-2">
              {option.amount} <span className="text-lg">Tickets</span>
            </div>
            
            {option.bonus > 0 && (
              <div className="flex items-center justify-center gap-2 text-[#FFD700] mb-4">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">+{option.bonus} Bonus Tickets!</span>
              </div>
            )}
            
            <div className="text-gray-300 mb-6">
              Total Tickets: {option.amount + option.bonus}
            </div>
            
            <div className="text-2xl font-bold text-white mb-6">
              ${option.price}
            </div>
            
            <button
              onClick={() => setSelectedOption({ amount: option.amount + option.bonus, price: option.price })}
              className="w-full bg-[#FFD700] text-[#556B2F] py-3 px-6 rounded-lg font-bold hover:bg-[#FFC700] transition-colors"
            >
              Select Package
            </button>
            
            {option.bonus > 0 && (
              <div className="mt-4 text-sm text-gray-300">
                ${(option.price / (option.amount + option.bonus)).toFixed(2)} per ticket
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedOption && (
        <PurchaseForm
          selectedTickets={selectedOption.amount}
          totalAmount={selectedOption.price}
          onClose={() => setSelectedOption(null)}
        />
      )}
    </>
  );
}