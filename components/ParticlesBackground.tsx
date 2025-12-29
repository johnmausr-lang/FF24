"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Звезды разлетаются от мыши
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 120,    // Радиус влияния мыши
              duration: 0.4,
              speed: 1,
            },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.05,     // Очень тонкие созвездия
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.4,        // Медленное космическое движение
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          number: {
            density: { enable: true, area: 800 },
            value: 100,        // Количество звезд
          },
          opacity: {
            value: { min: 0.1, max: 0.7 },
            animation: {
              enable: true,    // Эффект мерцания
              speed: 1,
              sync: false,
            },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
      }}
      className="w-full h-full"
    />
  );
};
