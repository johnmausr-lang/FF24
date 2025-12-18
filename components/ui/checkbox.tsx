"use client";

import * as React from "react";

export const Checkbox = ({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <div 
        onClick={onChange}
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
          checked ? "bg-accent-DEFAULT border-accent-DEFAULT shadow-neon-sm" : "border-white/20 group-hover:border-white/40"
        }`}
      >
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="text-sm font-bold uppercase tracking-tighter">{label}</span>
    </label>
  );
};
