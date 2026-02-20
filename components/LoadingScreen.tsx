"use client";

import React from "react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-12 h-12 border-4 border-white/10 border-t-[#E0FF64] rounded-full animate-spin" />
    </div>
  );
}
