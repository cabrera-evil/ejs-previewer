"use client";

import { useEffect, useState } from "react";

interface ErrorDisplayProps {
  error: string | null;
  details?: string;
  onClose?: () => void;
  autoHideDuration?: number;
}

export function ErrorDisplay({
  error,
  details,
  onClose,
  autoHideDuration = 0,
}: ErrorDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);

      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [error, autoHideDuration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Wait for animation to complete
    }
  };

  if (!error) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg dark:border-red-900 dark:bg-red-950">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">
              Error
            </h3>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300 break-words">
              {error}
            </p>
            {details && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-mono">
                {details}
              </p>
            )}
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 rounded-md text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
