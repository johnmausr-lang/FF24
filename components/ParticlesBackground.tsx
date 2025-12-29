"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, RecursivePartial, IOptions } from "@tsparticles/engine";

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  const options: RecursivePartial<IOptions> = {
    background: { color: "transparent" },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse", // Эффект отталкивания от мыши
        },
      },
      modes: {
        repulse: { distance: 150, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.05,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        outModes: { default: "out" },
      },
      number: {
        density: { enable: true, width: 800 },
        value: 100,
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
        animation: { enable: true, speed: 1, sync: false },
      },
      size: { value: { min: 1, max: 2.5 } },
    },
    detectRetina: true,
  };

  return <Particles id="tsparticles" className="w-full h-full" options={options} />;
};
