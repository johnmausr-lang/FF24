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
      className="w-full h-full"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Звезды убегают от мыши
            },
          },
          modes: {
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            enable: true,
            distance: 150,
            opacity: 0.05,
          },
          move: {
            enable: true,
            speed: 0.6,
            random: true,
            outModes: { default: "out" },
          },
          number: {
            density: { enable: true, area: 800 },
            value: 100,
          },
          opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: {
              enable: true,
              speed: 1,
            },
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
      }}
    />
  );
};
