export function Banner() {
  return (
    <div className="bg-gradient-to-b from-sky-100 to-white rounded-2xl shadow-2xl p-6 text-center h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold text-[#556B2F] mb-3">The Tesla Model Y</h2>
          <div className="text-4xl font-extrabold text-[#1b5e20] mb-4">JAMROCK</div>
          <div className="relative mb-6">
            <div className="text-3xl font-bold text-[#1b5e20] pb-10">
              SPRING BREAK
              <div className="absolute -rotate-6 bg-red-600 text-white px-4 py-1 text-2xl font-bold left-1/2 -translate-x-1/2 mt-2 shadow-lg">
                GIVEAWAY
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#FFD700] text-[#556B2F] py-2 px-6 rounded-full text-lg font-semibold inline-block shadow-lg mb-4">
            Now through March 29th
          </div>
          <p className="text-lg text-[#556B2F] font-bold">
            Every ticket increases your chance to win
          </p>
        </div>
      </div>
    </div>
  );
}

