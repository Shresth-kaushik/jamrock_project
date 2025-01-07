export function GuaranteeBanner() {
  return (
    <div className="bg-gradient-to-b from-sky-100 to-white rounded-2xl shadow-2xl p-6 text-center">
      <h2 className="text-3xl font-bold text-[#1b5e20] mb-4">
        Someone's guaranteed to win
      </h2>
      <div className="space-y-3">
        <p className="text-lg text-gray-700">
          With only a <span className="font-bold text-[#1b5e20]">$100</span> buy in
        </p>
        <p className="text-lg text-gray-700">
          or get the <span className="font-bold text-[#1b5e20]">VIP access</span> at just{" "}
          <span className="font-bold text-[#1b5e20]">$250</span> to enter the competition
        </p>
      </div>
    </div>
  );
}

