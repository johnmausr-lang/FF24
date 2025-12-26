@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Сделали фон чуть светлее (7% яркости вместо 3.9%) для глубины */
    --background: 240 10% 7%; 
    --foreground: 0 0% 98%;
    --accent-lime: 78 100% 70%;
    --border: 240 5% 25%;
  }

  html {
    scroll-behavior: smooth;
    /* Градиент вместо глухого черного цвета для премиального вида */
    background: radial-gradient(circle at 50% -20%, #1a1c1e 0%, #0a0a0b 100%);
  }

  body {
    @apply text-white antialiased overflow-x-hidden;
    background: transparent;
    /* Улучшенная отрисовка шрифтов */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Тюнинг скроллбара FF24 */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #000;
  }
  ::-webkit-scrollbar-thumb {
    background: #E0FF64;
    border-radius: 10px;
  }
}

@layer components {
  /* 3D ОБЪЕМ ДЛЯ БУКВ ЛОГОТИПА */
  .logo-3d-wrapper {
    perspective: 1200px;
  }

  .logo-3d {
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    transform: rotateX(12deg) rotateY(-8deg);
    /* Слоистые тени создают эффект физического объема букв */
    filter: 
      drop-shadow(1px 1px 0px #E0FF64)
      drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.9))
      drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5));
  }

  .logo-3d:hover {
    transform: rotateX(0deg) rotateY(0deg) scale(1.05) translateZ(30px);
    filter: 
      drop-shadow(0 0 20px rgba(224, 255, 100, 0.5))
      drop-shadow(0 0 50px rgba(224, 255, 100, 0.2));
  }

  /* Неоновое свечение текста */
  .text-neon {
    text-shadow: 0 0 15px rgba(224, 255, 100, 0.4), 0 0 30px rgba(224, 255, 100, 0.1);
  }

  /* Премиальная кнопка с эффектом сканирования */
  .btn-glass-lime {
    @apply relative overflow-hidden bg-accent-lime text-black font-[900] uppercase tracking-widest transition-all duration-500 flex items-center justify-center rounded-full;
    box-shadow: 0 10px 30px -10px rgba(224, 255, 100, 0.4);
  }

  .btn-glass-lime:hover {
    @apply scale-[1.05] -translate-y-1;
    box-shadow: 0 20px 50px -10px rgba(224, 255, 100, 0.6);
  }

  .btn-glass-lime::after {
    content: "";
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(transparent, rgba(255, 255, 255, 0.8), transparent);
    transform: skewY(-15deg);
    pointer-events: none;
  }

  .btn-glass-lime:hover::after {
    animation: glitch-scan 0.8s ease-in-out infinite;
  }

  /* Стеклянные карточки */
  .glass-card {
    @apply bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] transition-all duration-500;
  }

  .text-outline {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
    color: transparent;
  }
}

@keyframes glitch-scan {
  0% { top: -120%; }
  100% { top: 250%; }
}
