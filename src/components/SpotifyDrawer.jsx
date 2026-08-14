import React from 'react';
import { X, ExternalLink, Music2 } from 'lucide-react';
import { SPOTIFY_PLAYLIST_URL, SPOTIFY_EMBED_URL } from '../data/songsData';

export default function SpotifyDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div 
        className="relative w-full max-w-lg bg-[#121212] border border-[#1DB954]/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#1DB954]/20 to-black">
          <div className="flex items-center gap-2 text-[#1DB954]">
            <Music2 className="w-5 h-5 animate-pulse" />
            <h3 className="font-bold text-white text-sm sm:text-base tracking-wide">
              Spotify Patriotic Playlist
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={SPOTIFY_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-white/70 hover:text-white bg-white/10 px-3 py-1 rounded-full border border-white/10 transition-colors"
            >
              <span>Open App</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe */}
        <div className="p-4 bg-[#121212]">
          <iframe
            style={{ borderRadius: '16px' }}
            src={SPOTIFY_EMBED_URL}
            width="100%"
            height="420"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Patriotic Songs Playlist"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
