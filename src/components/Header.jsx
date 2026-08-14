import React, { useState, useEffect } from 'react';

export default function Header({ 
  toggleSpotify, 
  toggleYouTube,
  isSpotifyOpen,
  isYouTubeOpen
}) {
  const [timeStr, setTimeStr] = useState('');
  const [onlineCount, setOnlineCount] = useState(15847);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setTimeStr(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuate online counter slightly for live feel
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 7) - 3;
      setOnlineCount(prev => Math.max(12000, prev + change));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2.5 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between text-white select-none pointer-events-auto gap-1 sm:gap-4">
      {/* Top Left: Clock */}
      <div className="flex items-center gap-1.5 sm:gap-3 bg-black/50 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 shadow-lg text-[11px] sm:text-sm font-semibold tracking-wide flex-shrink-0">
        <span className="text-white/90 font-bold">{timeStr || '8:15 pm'}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 hidden xs:inline"></span>
        <span className="text-white/70 text-xs hidden md:inline">15 Aug 1947–2026</span>
      </div>

      {/* Top Center: Online Counter Pill */}
      <div className="flex items-center gap-1.5 sm:gap-2 bg-black/55 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 shadow-xl text-[11px] sm:text-xs font-semibold">
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-white/90 font-mono tracking-wider font-bold">
          {onlineCount.toLocaleString()}
        </span>
        <span className="text-white/70 font-sans hidden sm:inline">online</span>
      </div>

      {/* Top Right: Spotify & YT Music Links */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Spotify Button */}
        <button
          onClick={toggleSpotify}
          className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all backdrop-blur-md border shadow-lg ${
            isSpotifyOpen 
              ? 'bg-[#1DB954] text-black border-[#1DB954]' 
              : 'bg-black/40 text-white/90 border-white/15 hover:bg-[#1DB954]/20'
          }`}
          title="Spotify Playlist"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.841c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
          </svg>
          <span className="hidden xs:inline">Spotify</span>
        </button>

        {/* YT Music Button */}
        <button
          onClick={toggleYouTube}
          className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all backdrop-blur-md border shadow-lg ${
            isYouTubeOpen 
              ? 'bg-[#FF0000] text-white border-[#FF0000]' 
              : 'bg-black/40 text-white/90 border-white/15 hover:bg-[#FF0000]/20'
          }`}
          title="YouTube Playlist"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="hidden xs:inline">YT Music</span>
        </button>
      </div>
    </header>
  );
}
