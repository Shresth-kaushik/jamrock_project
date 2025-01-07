import React, { useState } from 'react';
import { Ticket, Star, Car, CoffeeIcon as Cocktail } from 'lucide-react';
import { PurchaseForm } from './PurchaseForm';
import { Toaster } from 'react-hot-toast';

export function TicketOptions() {
  const [selectedOption, setSelectedOption] = useState<null | {
    amount: number;
    price: number;
  }>(null);

  const ticketOptions = [
    {
      price: 100,
      title: "Regular Admission",
      ticketValue: 5,
      carEntries: 20,
      features: [],
      popular: false,
    },
    {
      price: 250, 
      title: "VIP Admission",
      carEntries: 100,
      ticketValue: 2.50,
      features: ["Table and bottle service", "Private Bar", "Exclusive Giveaway 🎁"],
      popular: true,
    }
  ];

  return (
    <>
      <Toaster position="top-center" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center mx-auto w-full max-w-4xl">
        {ticketOptions.map((option, index) => (
          <div
            key={index}
            className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-300 w-full md:max-w-sm flex flex-col ${
              option.popular ? 'ring-2 ring-[#FFD700]' : ''
            }`}
          >
            {option.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FFD700] text-[#556B2F] px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  VIP
                </span>
              </div>
            )}

            <div className="flex-1 space-y-4">
              <div className="flex justify-center mb-4">
                {option.popular ? (
                  <Cocktail className="w-12 h-12 text-[#FFD700]" />
                ) : (
                  <Ticket className="w-12 h-12 text-[#FFD700]" />
                )}
              </div>

              <div className="text-3xl font-bold text-white">
                ${option.price} <span className="text-xl">{option.title}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#FFD700]">
                <Car className="w-5 h-5" />
                <span className="font-semibold">{option.carEntries} Entry in Car Giveaway</span>
              </div>

              <div className="space-y-2">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="text-gray-300">
                    {feature}
                  </div>
                ))}
              </div>

              <div className="text-gray-300">
                Value ${option.ticketValue} per ticket
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <button
                onClick={() =>
                  setSelectedOption({
                    amount: option.carEntries,
                    price: option.price,
                  })
                }
                className="w-full bg-[#FFD700] text-[#556B2F] py-3 px-6 rounded-lg font-bold hover:bg-[#FFC700] transition-colors"
              >
                Select Package
              </button>
            </div>
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

