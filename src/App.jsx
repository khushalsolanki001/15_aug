import React, { useState } from 'react';
import Header from './components/Header';
import HeroTitle from './components/HeroTitle';
import MusicPlayerDock from './components/MusicPlayerDock';
import SpotifyDrawer from './components/SpotifyDrawer';
import YouTubeDrawer from './components/YouTubeDrawer';
import PatrioticParticles from './components/PatrioticParticles';
import bgImage from './assets/indipendence_day.png';
import './App.css';

export default function App() {
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);
  const [isYouTubeOpen, setIsYouTubeOpen] = useState(false);

  const toggleSpotify = () => {
    setIsSpotifyOpen(prev => !prev);
    if (isYouTubeOpen) setIsYouTubeOpen(false);
  };

  const toggleYouTube = () => {
    setIsYouTubeOpen(prev => !prev);
    if (isSpotifyOpen) setIsSpotifyOpen(false);
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-scene-responsive select-none font-['Inter',sans-serif]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Background Dark Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/60 pointer-events-none z-0" />
      
      {/* Subtle Radial Glow in Center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,153,51,0.12)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Particle Effect Layer */}
      <PatrioticParticles />

      {/* Main Header (Clock, Online Pill, Spotify/YT Triggers) */}
      <Header
        toggleSpotify={toggleSpotify}
        toggleYouTube={toggleYouTube}
        isSpotifyOpen={isSpotifyOpen}
        isYouTubeOpen={isYouTubeOpen}
      />

      {/* Center Hero Devanagari Typography Banner */}
      <HeroTitle />

      {/* Floating Bottom Glassmorphism Music Player Dock */}
      <MusicPlayerDock />

      {/* Spotify Embedded Playlist Drawer / Modal */}
      <SpotifyDrawer
        isOpen={isSpotifyOpen}
        onClose={() => setIsSpotifyOpen(false)}
      />

      {/* YouTube Embedded Playlist Drawer / Modal */}
      <YouTubeDrawer
        isOpen={isYouTubeOpen}
        onClose={() => setIsYouTubeOpen(false)}
      />
    </div>
  );
}
