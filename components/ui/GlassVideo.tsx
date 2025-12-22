"use client";

import { useRef, useEffect, useState } from "react";

export const GlassVideo = ({
  src,
  blur = "blur-[60px]",
  opacity = 0.4,
  overlayColor = "bg-black/40",
  playbackRate = 0.6,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      // Принудительный запуск, если автоплей заблокирован
      videoRef.current.play().catch(() => {
        console.log("Autoplay blocked or video error");
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
      <div className={`absolute inset-0 z-10 ${blur} ${overlayColor} backdrop-transform`} />
    </div>
  );
};
