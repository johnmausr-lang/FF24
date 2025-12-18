"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#2563EB", "#E0FF64", "#1E1B4B"],
          },
          links: {
            color: "#2563EB",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          number: {
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
            value: 60,
          },
          opacity: {
            // В новых версиях диапазон задается здесь
            value: { min: 0.1, max: 0.8 }, 
            animation: {
              enable: true,
              speed: 1,
              sync: false,
              // Удалено свойство min/minimumValue, так как оно берется из value выше
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            // В новых версиях диапазон задается здесь
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 3,
              sync: false,
              // Удалено свойство min/minimumValue
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};
