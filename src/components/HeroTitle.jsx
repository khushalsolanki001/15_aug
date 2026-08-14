import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function HeroTitle() {
  const slogans = [
    { main: "स्वतंत्रता दिवस", sub: "79TH INDEPENDENCE DAY OF INDIA • 15 AUGUST 2026" },
    { main: "जय हिन्द", sub: "VICTORY TO INDIA • VANDE MATARAM" },
    { main: "वन्दे मातरम्", sub: "SALUTING THE PRIDE OF OUR NATION" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  const triggerJaiHindEffect = (e) => {
    e.stopPropagation();
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 300);

    // Cycle slogan
    setCurrentIndex((prev) => (prev + 1) % slogans.length);

    // Massive Tricolor Fireworks Confetti Blast
    const count = 200;
    const defaults = {
      origin: { y: 0.45 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#FF9933', '#FFFFFF', '#138808', '#FFD700']
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const active = slogans[currentIndex];

  return (
    <div className="absolute top-[11vh] sm:top-[12vh] left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-20 px-3 text-center select-none">
      
      {/* Main Large Devanagari Heading (Responsive font size for mobile) */}
      <h1 
        onClick={triggerJaiHindEffect}
        className="pointer-events-auto cursor-pointer font-['Yatra_One','Rozha_One',serif] text-[2.75rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-tight tracking-tight text-white transition-transform duration-300 hover:scale-[1.03] active:scale-95 filter"
        style={{
          textShadow: '0 4px 25px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 153, 51, 0.35)'
        }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-amber-50 to-orange-100">
          {active.main}
        </span>
      </h1>

      {/* Subtitle Text */}
      <p 
        className="mt-1.5 sm:mt-3 text-[10px] xs:text-xs sm:text-base md:text-lg font-bold text-white/90 tracking-widest uppercase filter max-w-xs sm:max-w-none"
        style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
      >
        {active.sub}
      </p>

      {/* Center Jai Hind Button */}
      <div className="mt-3.5 sm:mt-6 pointer-events-auto">
        <button
          onClick={triggerJaiHindEffect}
          className={`group relative inline-flex items-center justify-center bg-gradient-to-r from-orange-500/80 via-white/20 to-emerald-600/80 hover:from-orange-500 hover:to-emerald-600 backdrop-blur-xl px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/40 text-xs sm:text-base font-extrabold tracking-wider text-white shadow-[0_10px_35px_rgba(0,0,0,0.7)] transition-all duration-200 transform hover:scale-110 active:scale-90 ${
            isClicking ? 'scale-125 ring-4 ring-orange-400' : ''
          }`}
        >
          <span className="drop-shadow">Jai Hind</span>
        </button>
      </div>

    </div>
  );
}
