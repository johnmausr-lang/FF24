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
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        particles: {
          color: { value: "#E0FF64" },
          links: { color: "#E0FF64", distance: 150, enable: true, opacity: 0.1, width: 1 },
          move: { enable: true, speed: 0.5 },
          number: { density: { enable: true }, value: 30 },
          opacity: { value: { min: 0.1, max: 0.3 } },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};
