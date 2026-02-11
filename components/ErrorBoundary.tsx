'use client';

import React, { ReactNode, ErrorInfo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

// Расширяем глобальный интерфейс Window для поддержки Sentry
declare global {
  interface Window {
    __SENTRY__?: {
      captureException: (error: any, context: any) => void;
    };
  }
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Используем default export для исключения ошибки "is not a constructor"
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Безопасная проверка Sentry
    if (typeof window !== 'undefined' && window.__SENTRY__) {
      window.__SENTRY__.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 max-w-md text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">
              Ошибка системы
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Произошел технический сбой. Пожалуйста, попробуйте перезагрузить страницу.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-4 py-3 bg-[#E0FF64] text-black text-[10px] font-black uppercase rounded-full hover:scale-105 transition-transform"
              >
                <RefreshCw className="w-3 h-3 mr-2 inline" />
                Обновить
              </button>
              <a
                href="/"
                className="flex-1 px-4 py-3 bg-white/10 text-white text-[10px] font-black uppercase rounded-full flex items-center justify-center gap-2"
              >
                <Home className="w-3 h-3" />
                Главная
              </a>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
