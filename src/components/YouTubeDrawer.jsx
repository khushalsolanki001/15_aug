import React from 'react';
import { X, ExternalLink, Youtube } from 'lucide-react';
import { YOUTUBE_PLAYLIST_URL, YOUTUBE_EMBED_URL } from '../data/songsData';

export default function YouTubeDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0f0f0f] border border-red-600/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-red-950/40 to-black">
          <div className="flex items-center gap-2 text-red-500">
            <Youtube className="w-5 h-5 animate-pulse" />
            <h3 className="font-bold text-white text-sm sm:text-base tracking-wide">
              YouTube Patriotic Playlist
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={YOUTUBE_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-white/70 hover:text-white bg-white/10 px-3 py-1 rounded-full border border-white/10 transition-colors"
            >
              <span>Open YouTube</span>
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

        {/* Embedded YouTube Playlist Iframe */}
        <div className="p-4 bg-[#0f0f0f]">
          <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={YOUTUBE_EMBED_URL}
              title="YouTube Patriotic Songs Playlist"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
