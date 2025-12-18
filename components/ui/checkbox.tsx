"use client"

import * as React from "react"

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled,
}: {
  checked: boolean
  onCheckedChange: (v: boolean) => void
  label: string
  disabled?: boolean
}) {
  return (
    <label className={`flex items-center gap-3 select-none ${disabled ? "opacity-50" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 accent-[rgb(var(--primary))]"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  )
}
