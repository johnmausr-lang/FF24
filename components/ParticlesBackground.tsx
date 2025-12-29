"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" }, // Эффект связей при наведении
            resize: { enable: true },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.2 } },
          },
        },
        particles: {
          color: { value: ["#2563EB", "#E0FF64"] },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.05,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          number: {
            density: { enable: true, width: 1920, height: 1080 },
            value: 50,
          },
          opacity: {
            value: { min: 0.1, max: 0.3 },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
