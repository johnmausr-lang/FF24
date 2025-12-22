"use client";

import { useRef, useEffect } from "react";

interface GlassVideoProps {
  src: string;
  blur?: string;
  opacity?: number;
  overlayColor?: string;
  playbackRate?: number;
}

export const GlassVideo = ({
  src,
  blur = "blur-[60px]",
  opacity = 0.4,
  overlayColor = "bg-black/40",
  playbackRate = 0.6,
}: GlassVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
      {/* Слой 1: Само видео */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110" // scale-110 убирает артефакты по краям при блюре
        style={{ opacity: opacity }}
      />

      {/* Слой 2: Матовый фильтр и Блюр */}
      <div className={`absolute inset-0 z-10 ${blur} ${overlayColor} backdrop-transform`} />
      
      {/* Слой 3: Легкий шум или виньетка для глубины */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};
