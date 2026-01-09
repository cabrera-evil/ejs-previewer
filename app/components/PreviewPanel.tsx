"use client";

import { useEffect, useRef } from "react";

interface PreviewPanelProps {
  html: string;
  isLoading?: boolean;
}

export function PreviewPanel({ html, isLoading = false }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && html) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
      }
    }
  }, [html]);

  return (
    <div className="relative h-full w-full bg-white dark:bg-gray-950">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-gray-950/80">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm font-medium">Rendering...</span>
          </div>
        </div>
      )}

      {!html && !isLoading && (
        <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-600">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 mb-3 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <p className="text-sm">Preview will appear here</p>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        title="Preview"
        sandbox="allow-scripts"
        className="h-full w-full border-0"
        style={{ display: html ? "block" : "none" }}
      />
    </div>
  );
}
