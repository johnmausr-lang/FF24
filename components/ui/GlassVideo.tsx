"use client";

import React, { useEffect, useRef } from "react";

interface GlassVideoProps {
  src: string;
  opacity?: number;
  blur?: string;
  overlayColor?: string;
  playbackRate?: number; // Добавляем в интерфейс
}

export const GlassVideo = ({ 
  src, 
  opacity = 0.4, 
  blur = "backdrop-blur-2xl", 
  overlayColor = "bg-black/40",
  playbackRate = 1 // Значение по умолчанию
}: GlassVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity }}
      >
        <source src={src} type="video/webm" />
      </video>
      <div className={`absolute inset-0 ${overlayColor} ${blur}`} />
    </div>
  );
};
