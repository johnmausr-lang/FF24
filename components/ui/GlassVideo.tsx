"use client";

import React from "react";

interface GlassVideoProps {
  src: string;
  opacity?: number;
  blur?: string;
  overlayColor?: string;
}

export const GlassVideo = ({ 
  src, 
  opacity = 0.4, 
  blur = "backdrop-blur-2xl", 
  overlayColor = "bg-black/40" 
}: GlassVideoProps) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
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
