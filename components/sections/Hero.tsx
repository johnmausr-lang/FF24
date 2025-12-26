"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 logo-3d-wrapper"
          >
            {/* ГЛАВНЫЙ ЛОГОТИП С 3D ЭФФЕКТОМ */}
            <Image 
              src="/logo-ff24.png" 
              alt="FF24 Fulfillment" 
              width={350} 
              height={120}
              className="logo-3d w-[280px] md:w-[450px] h-auto object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass px-6 py-2 rounded-full border-white/10 flex items-center gap-3 mb-10"
          >
            <span className="w-2 h-2 bg-[#E0FF64] rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
              Система онлайн: Готовы к масштабированию
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-7xl font-black leading-[0.9] mb-12 text-white max-w-5xl italic uppercase tracking-tighter"
          >
            Логистика, которая <br />
            <span className="text-[#E0FF64] text-neon">разгоняет</span> ваш бизнес
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <a 
              href="#lead" 
              className="btn-glass-lime group px-12 py-6 text-lg"
            >
              Запустить поток
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Затемнение низа */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-[5]" />
    </section>
  );
};
