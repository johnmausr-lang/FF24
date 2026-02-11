'use client';

import React, { ReactNode, ErrorInfo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

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
    // Логирование ошибки в консоль и отправка на Sentry
    console.error('Error caught by boundary:', error, errorInfo);

    // Отправка на Sentry
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
            className="glass-card p-8 max-w-md text-center rounded-2xl"
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

            <h1 className="text-2xl font-black text-white mb-2 uppercase">
              Что-то пошло не так
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Приносим извинения за неудобства. Пожалуйста, попробуйте еще раз или вернитесь на главную.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4 mb-6 text-left">
                <p className="text-red-400 text-xs font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 btn-glass-lime flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Попробовать снова
              </button>
              <a
                href="/"
                className="flex-1 btn-glass-secondary flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
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
        <h1 className="text-3xl font-black text-white mb-4">Ошибка сервера</h1>
        <p className="text-slate-400 mb-8">Пожалуйста, попробуйте позже</p>
        <a href="/" className="btn-glass-lime inline-flex">
          На главную
        </a>
      </div>
    </div>
  );
}
