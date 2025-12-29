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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      if (isInView) {
        videoRef.current.play().catch(() => {
          console.warn("Video autoplay was prevented");
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [playbackRate, isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] bg-black">
      {isInView && (
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
      )}
      {/* Слой размытия (Glass Effect) */}
      <div className={`absolute inset-0 backdrop-blur-3xl ${blur} ${overlayColor} z-10 pointer-events-none`} />
    </div>
  );
};
