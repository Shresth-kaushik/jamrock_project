export function GuaranteeBanner() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white rounded-2xl shadow-lg p-4 md:p-8 text-center max-w-[99%] mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-[#445829] mb-6 md:mb-12">
        Someone will win at this giveaway event.
      </h2>

      <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto mb-4 md:mb-8">
        {/* Regular Ticket */}
        <div className="flex flex-col justify-between space-y-2 bg-white p-4 rounded-lg shadow">
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl md:text-2xl font-bold">Regular Tickets</span>
              <span className="bg-yellow-400 px-2 py-1 rounded text-sm">🎫</span>
              <span className="text-xl md:text-2xl font-bold">$100</span>
            </div>
            <div className="bg-[#f44336] text-white py-2 px-4 rounded-md text-lg md:text-xl font-bold">
              You get 20 entries
            </div>
          </div>
          <p className="text-lg md:text-xl font-semibold">$5 per entry value!</p>
        </div>

        {/* VIP Ticket */}
        <div className="flex flex-col justify-between space-y-2 bg-white p-4 rounded-lg shadow">
          <div>
            <div className="flex items-center justify-center gap-2 mb-10">
              <span className="text-xl md:text-2xl font-bold">VIP Ticket</span>
              <span className="bg-yellow-400 px-2 py-1 rounded text-sm">🎫</span>
              <span className="text-xl md:text-2xl font-bold">$250</span>
            </div>
            <div className="bg-[#f44336] text-white py-2 px-4 rounded-md text-lg md:text-xl font-bold">
              You get 100 entries
            </div>
          </div>
          <p className="text-lg md:text-xl font-semibold">$2.50 per entry value!</p>
        </div>
      </div>

      <div className="space-y-1 md:space-y-2 text-[#445829] text-base md:text-xl font-semibold">
        <p>Attendance not required to win</p>
        <p>Event drawing will be broadcasted live on Instagram and TikTok</p>
      </div>
    </div>
  );
}

