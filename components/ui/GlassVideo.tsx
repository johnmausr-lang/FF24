"use client";

import { useRef, useEffect, useState } from "react";

// Описываем интерфейс пропсов для TypeScript
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      // Принудительный запуск с обработкой ошибки
      videoRef.current.play().catch(() => {
        console.warn("Video autoplay was prevented");
      });
    }
  }, [playbackRate, src]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] bg-black">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ opacity: opacity }}
      />
      {/* Слой размытия и наложения цвета */}
      <div className={`absolute inset-0 z-10 ${blur} ${overlayColor} backdrop-transform`} />
    </div>
  );
};
