"use client";

import { useRef, useState } from "react";
import { Music2, Pause, Play, Volume2 } from "lucide-react";

const TRACK_SRC = "/music/our-song.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8">
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar nuestra canción" : "Reproducir nuestra canción"}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
        className="music-glass group flex items-center gap-3 rounded-full px-4 py-3 text-cream shadow-glass transition-all duration-500 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-gold-300/40"
      >
        <span className={`music-icon ${isPlaying ? "music-icon-playing" : ""}`}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </span>

        <span className="hidden sm:block text-left">
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[.22em] text-gold-300">
            <Volume2 size={11} />
            Nuestra canción
          </span>
          <span className="mt-0.5 block text-xs text-mist/80">
            {isPlaying ? "Sonando..." : "Tocá para escuchar"}
          </span>
        </span>

        <Music2
          size={15}
          className={`text-gold-300/80 transition-transform duration-700 ${isPlaying ? "rotate-[360deg]" : ""}`}
        />
      </button>
    </div>
  );
}
