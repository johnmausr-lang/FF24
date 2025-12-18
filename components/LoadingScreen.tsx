"use client"

import { motion } from "framer-motion"

export default function LoadingScreen({ done }: { done: boolean }) {
  if (done) return null

  return (
    <div className="fixed inset-0 z-[100] bg-white grid place-items-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-xl font-semibold">FF24</div>
        <div className="h-2 w-56 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full w-20 bg-[rgb(var(--primary))]"
            animate={{ x: [ -40, 240 ] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
          />
        </div>
        <div className="text-sm text-slate-500">Загрузка…</div>
      </motion.div>
    </div>
  )
}
