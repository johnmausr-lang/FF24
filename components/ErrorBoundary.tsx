'use client';

import React, { ReactNode, ErrorInfo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

// Расширяем глобальный интерфейс Window, чтобы TypeScript знал о Sentry
declare global {
  interface Window {
    __SENTRY__?: {
      captureException: (error: any, context: any) => void;
    };
  }
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логирование ошибки в консоль
    console.error('Error caught by boundary:', error, errorInfo);

    // Безопасная отправка на Sentry с использованием расширенного типа Window
    if (typeof window !== 'undefined' && window.__SENTRY__) {
      window.__SENTRY__.captureException(error, { contexts: { react: errorInfo } });
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 max-w-md text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </motion.div>

            <h1 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">
              Что-то пошло не так
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Приносим извинения за неудобства. Пожалуйста, попробуйте еще раз или вернитесь на главную.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4 mb-6 text-left overflow-hidden">
                <p className="text-red-400 text-[10px] font-mono break-all leading-tight">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-3 bg-[#E0FF64] text-black text-[10px] font-black uppercase rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <RefreshCw className="w-3 h-3" />
                Попробовать снова
              </button>
              <a
                href="/"
                className="flex-1 px-4 py-3 bg-white/10 text-white text-[10px] font-black uppercase rounded-full flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
              >
                <Home className="w-3 h-3" />
                На главную
              </a>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Для использования в Server Components
export function ErrorFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white mb-4 uppercase italic">Ошибка сервера</h1>
        <p className="text-slate-400 mb-8 font-medium">Пожалуйста, попробуйте позже</p>
        <a href="/" className="px-8 py-3 bg-[#E0FF64] text-black text-[10px] font-black uppercase rounded-full">
          На главную
        </a>
      </div>
    </div>
  );
}
