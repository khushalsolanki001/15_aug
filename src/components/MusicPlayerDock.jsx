import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, ListMusic, Volume2, VolumeX } from 'lucide-react';

const PLAYLIST_ID = "PL0Z67tlyTaWo-c_QyUnhsoa4cUwceCmRu";

export default function MusicPlayerDock() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("Top 15 August Patriotic Songs");
  const [currentArtist, setCurrentArtist] = useState("Official YouTube Playlist");
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showTracklist, setShowTracklist] = useState(false);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Initialize YouTube Iframe API
  useEffect(() => {
    // Load YT API script if not already present
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }

    const createPlayer = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player('yt-player-instance', {
          height: '0',
          width: '0',
          playerVars: {
            listType: 'playlist',
            list: PLAYLIST_ID,
            autoplay: 0,
            controls: 0,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              setIsPlayerReady(true);
              updateVideoInfo();
            },
            onStateChange: (event) => {
              // YT.PlayerState: UNSTARTED (-1), ENDED (0), PLAYING (1), PAUSED (2), BUFFERING (3)
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                updateVideoInfo();
                startProgressTracker();
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
                stopProgressTracker();
              } else if (event.data === window.YT.PlayerState.ENDED) {
                // Auto plays next song seamlessly in playlist!
                updateVideoInfo();
              }
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }

    return () => {
      stopProgressTracker();
    };
  }, []);

  const updateVideoInfo = () => {
    if (!playerRef.current || !playerRef.current.getVideoData) return;
    try {
      const data = playerRef.current.getVideoData();
      if (data && data.title) {
        setCurrentTitle(data.title);
        setCurrentArtist(data.author || "Independence Day Playlist");
      }
      const dur = playerRef.current.getDuration();
      if (dur) setDuration(dur);
    } catch (e) {
      console.log("YT get data err:", e);
    }
  };

  const startProgressTracker = () => {
    stopProgressTracker();
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          const curr = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration();
          setCurrentTime(curr || 0);
          if (dur) setDuration(dur);
          updateVideoInfo();
        } catch (err) {}
      }
    }, 500);
  };

  const stopProgressTracker = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    if (playerRef.current && playerRef.current.nextVideo) {
      playerRef.current.nextVideo();
    }
  };

  const handlePrev = () => {
    if (playerRef.current && playerRef.current.previousVideo) {
      playerRef.current.previousVideo();
    }
  };

  const handleSeek = (e) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(targetTime, true);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed bottom-5 sm:bottom-7 left-0 right-0 z-40 flex flex-col items-center justify-center px-4 pointer-events-none">
      
      {/* Hidden YouTube Player Iframe API Instance */}
      <div className="hidden">
        <div id="yt-player-instance"></div>
      </div>

      {/* Floating Translucent Player Dock (Saloon.wtf style) */}
      <div className="pointer-events-auto relative w-full max-w-xl sm:max-w-2xl bg-black/55 hover:bg-black/70 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-full p-2.5 sm:p-3 flex items-center gap-3 sm:gap-4 transition-all duration-300">
        
        {/* Album Cover Thumbnail */}
        <div className="relative group cursor-pointer flex-shrink-0" onClick={togglePlay}>
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-emerald-500 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=400&auto=format&fit=crop"
                alt="15 August Playlist"
                className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Track Title, Author & Timeline Progress Slider */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <div className="truncate">
            <h4 className="text-white font-semibold text-xs sm:text-sm truncate leading-tight">
              {currentTitle || "Top 15 August Patriotic Songs"}
            </h4>
            <p className="text-white/60 text-[10px] sm:text-xs truncate">
              {currentArtist} • <span className="text-orange-300 font-mono text-[10px]">YouTube Playlist</span>
            </p>
          </div>

          {/* Progress Slider & Timestamps */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/60">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Dock Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 pr-1 flex-shrink-0">
          {/* Previous Song */}
          <button
            onClick={handlePrev}
            className="p-1.5 text-white/70 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            title="Previous Song in Playlist"
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </button>

          {/* Play / Pause Circular Button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black hover:bg-amber-100 flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current text-black" />
            ) : (
              <Play className="w-5 h-5 fill-current text-black ml-0.5" />
            )}
          </button>

          {/* Next Song */}
          <button
            onClick={handleNext}
            className="p-1.5 text-white/70 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            title="Next Song in Playlist"
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}
