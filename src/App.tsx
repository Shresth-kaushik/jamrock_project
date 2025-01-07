import React from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { Car, Award, Gift } from "lucide-react";
import { ImageGallery } from "./components/ImageGallery";
import { CountdownTimer } from "./components/CountdownTimer";
import { VideoSection } from "./components/VideoSection";
import { DetailedInfo } from "./components/DetailedInfo";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { TicketOptions } from "./components/TicketOptions";
import { SuccessPage } from "./components/SuccessPage";
import { InvoiceLookup } from "./components/InvoiceLookup";
import {Banner} from "./components/Banner";
import {GuaranteeBanner} from "./components/GuaranteeBanner";
import {FeaturesSection} from "./components/FeaturesSection";

function HomePage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#556B2F] to-gray-900">
      <header className="bg-black/30 backdrop-blur-sm fixed w-full z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-[#FFD700]" />
                <span className="text-xl font-bold text-[#FFD700]">
                  Jamrock Car Giveaway Event
                </span>
              </Link>
            </div>
            <div className="flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("tickets")}
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                Tickets
              </button>
              <button
                onClick={() => scrollToSection("video")}
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                Video
              </button>
              <button
                onClick={() => scrollToSection("details")}
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                Details
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                FAQ
              </button>
              <Link
                to="https://jamrock-car-rental.replit.app"
                className="text-white hover:text-[#FFD700] transition-colors py-2"
              >
                Car Rental
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section className="py-10 min-h-screen bg-gradient-to-b from-[#445829] to-[#2d3a1b]">
          <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video Column */}
              <div className="relative">
                <div className="h-[500px] lg:h-[860px] rounded-2xl overflow-hidden"> 
                  <VideoSection />
                </div>
              </div>

              {/* Banners Column */}
              <div className="flex flex-col gap-6"> 
                {/* First Banner */}
                {/* <div className="flex-1 min-h-0"> */}
                  <div className="flex-shrink-0">
                  <Banner />
                </div>

                {/* Guarantee Banner */}
                {/* <div className="flex-shrink-0">
                */}
                <div className="flex-1 min-h-0">
                  <GuaranteeBanner />
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section id="home" className="relative h-screen">
          <div className="absolute inset-0 z-10">
            <ImageGallery />
          </div>

          {/* Main Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-full bg-black/30 backdrop-blur-sm py-12 pointer-events-auto">
              <div className="container mx-auto px-4">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">
                    Win Jamrock this custom Tesla Model Y by<br />
                    Superstar Artistt{'  '}
                    <span className="relative inline-block mt-5">
                      <span className="relative z-10 text-white">ARTLANTA</span>
                      <span 
                        className="absolute inset-0 bg-red-600 -skew-y-3 transform -rotate-3" 
                        style={{ 
                          padding: '0.25em 0.5em',
                          left: '-0.5em',
                          right: '-0.5em',
                          top: '-0.25em',
                          bottom: '-0.25em'
                        }}
                      ></span>
                    </span>
                  </h2>
                  <button
                    onClick={() => scrollToSection("tickets")}
                    className="bg-[#FFD700] text-[#556B2F] px-12 py-3 rounded-lg text-xl font-bold hover:bg-[#FFC700] transition-colors shadow-lg"
                  >
                    Enter Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Countdown Timer at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-30 py-2">
            <div className="container mx-auto px-4">
              <div className="flex justify-center items-center">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </section>
        
{/* 
        <section className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Time Remaining
            </h2>
            <CountdownTimer />
          </div>
        </section> */}

        <section id="tickets" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Choose Your Tickets
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                With only a $100 buy in
                or get the VIP access at just $250 to win this amazing Tesla Model Y.
              </p>
              
            </div>
            <TicketOptions />
          </div>
        </section>

        <InvoiceLookup />

        {/* <section id="call" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                24/7 AI Customer Service
              </h2>
              <div className="text-2xl text-gray-300 max-w-2xl mx-auto">
                <span className="text-gray-100">Call Now:</span>
                <a
                  href="tel:+18508202550"
                  className="text-[#FFD700] pl-2 font-bold"
                >
                  +1 (850) 820-2550
                </a>
              </div>
            </div>
          </div>
        </section> */}


        <section id="call" className="relative py-20 mt-10">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://i.imgur.com/tXzeznZ.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-black opacity-60 z-10" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                24/7 AI Customer Service
              </h2>
              <div className="text-2xl text-gray-300 max-w-2xl mx-auto">
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
        </section>

        


        
        <section id="details" className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Prize Details
            </h2>
            <DetailedInfo />
          </div>
        </section>

        
        {/* <section className="py-20"> */}

          <FeaturesSection/>
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                <Car className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Custom Tesla Model Y
                </h3>
                <p className="text-gray-300">
                  Fully loaded with premium features and custom modifications.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                <Award className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Guaranteed Winner
                </h3>
                <p className="text-gray-300">
                  One lucky participant will definitely win this amazing prize.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                <Gift className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Bonus Entries
                </h3>
                <p className="text-gray-300">
                  Buy more tickets for better chances to win!
                </p>
              </div>
            </div>
          </div> */}
        {/* </section> */}

            

        

        <section id="faq" className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <h2 className="text-4xl font-bold text-center text-white mb-16">
              Frequently Asked Questions
            </h2> */}
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
