"use client";

import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export const GlobalParticles = () => {
  const { theme } = useTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const isDark = theme === "dark";
  const particleColor = isDark ? "#E0FF64" : "#94a3b8";
  const linkColor = isDark ? "#E0FF64" : "#cbd5e1";

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40">
      <Particles
        id="tsparticles-global"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: particleColor },
            links: { color: linkColor, distance: 150, enable: true, opacity: 0.3, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true, outModes: { default: "bounce" } },
            number: { density: { enable: true, width: 800 }, value: 40 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};
