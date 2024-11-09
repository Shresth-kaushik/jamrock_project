import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Car, Award, Gift } from 'lucide-react';
import { ImageGallery } from './components/ImageGallery';
import { CountdownTimer } from './components/CountdownTimer';
import { VideoSection } from './components/VideoSection';
import { DetailedInfo } from './components/DetailedInfo';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { TicketOptions } from './components/TicketOptions';
import { SuccessPage } from './components/SuccessPage';
import { InvoiceLookup } from './components/InvoiceLookup';

function HomePage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#556B2F] to-gray-900">
      <header className="bg-black/30 backdrop-blur-sm fixed w-full z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-[#FFD700] text-2xl font-bold">JamRock Rental</div>
            <div className="flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-white hover:text-[#FFD700] transition-colors">Home</button>
              <button onClick={() => scrollToSection('tickets')} className="text-white hover:text-[#FFD700] transition-colors">Tickets</button>
              <button onClick={() => scrollToSection('video')} className="text-white hover:text-[#FFD700] transition-colors">Video</button>
              <button onClick={() => scrollToSection('details')} className="text-white hover:text-[#FFD700] transition-colors">Details</button>
              <button onClick={() => scrollToSection('faq')} className="text-white hover:text-[#FFD700] transition-colors">FAQ</button>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section id="home" className="relative">
          <ImageGallery />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-8">Win a Tesla Model Y</h1>
              <button 
                onClick={() => scrollToSection('tickets')} 
                className="bg-[#FFD700] text-[#556B2F] px-8 py-4 rounded-full text-xl font-bold hover:bg-[#FFC700] transition-colors"
              >
                Enter Now
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Time Remaining</h2>
            <CountdownTimer />
          </div>
        </section>

        <section id="tickets" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Choose Your Tickets</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Get 5 bonus tickets with every 5 tickets purchased! Double your chances to win
                this amazing Tesla Model Y.
              </p>
            </div>
            <TicketOptions />
          </div>
        </section>

        <InvoiceLookup />

        <section id="video" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Watch the Video</h2>
            <VideoSection />
          </div>
        </section>

        <section id="details" className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Prize Details</h2>
            <DetailedInfo />
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                <Car className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Custom Tesla Model Y</h3>
                <p className="text-gray-300">Fully loaded with premium features and custom modifications.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                <Award className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Guaranteed Winner</h3>
                <p className="text-gray-300">One lucky participant will definitely win this amazing prize.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                <Gift className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Bonus Entries</h3>
                <p className="text-gray-300">Buy more tickets for better chances to win!</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Frequently Asked Questions</h2>
            <FAQ />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;