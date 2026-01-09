"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Panel,
  Group,
  Separator,
} from "react-resizable-panels";
import { CodeEditor } from "./components/CodeEditor";
import { PreviewPanel } from "./components/PreviewPanel";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { SampleTemplates } from "./components/SampleTemplates";
import { ThemeToggle } from "./components/ThemeToggle";
import type { SampleTemplate } from "./lib/samples";

export default function Home() {
  const [template, setTemplate] = useState("");
  const [data, setData] = useState("{}");
  const [rendered, setRendered] = useState("");
  const [error, setError] = useState<{ message: string; details?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced render function
  const renderTemplate = useCallback(
    async (templateCode: string, jsonData: string) => {
      // Clear previous error
      setError(null);

      // Don't render if template is empty
      if (!templateCode.trim()) {
        setRendered("");
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch("/api/render", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            template: templateCode,
            data: jsonData,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setError({
            message: result.error || "Failed to render template",
            details: result.details,
          });
          setRendered("");
        } else {
          setRendered(result.rendered);
        }
      } catch (err) {
        setError({
          message: "Network error",
          details: err instanceof Error ? err.message : "Unknown error",
        });
        setRendered("");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Debounce the render function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      renderTemplate(template, data);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [template, data, renderTemplate]);

  const handleSampleSelect = (sample: SampleTemplate) => {
    setTemplate(sample.template);
    setData(sample.data);
  };

  const handleClear = () => {
    setTemplate("");
    setData("{}");
    setRendered("");
    setError(null);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              EJS Previewer
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Live template editor with instant preview
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SampleTemplates onSelect={handleSampleSelect} />
          <button
            onClick={handleClear}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Clear all"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content - Resizable Panels */}
      <div className="flex-1 overflow-hidden">
        <Group direction="horizontal" className="h-full">
          {/* EJS Template Panel */}
          <Panel defaultSize={33} minSize={20}>
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-800 dark:bg-gray-800">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  EJS Template
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Write your EJS template code here
                </p>
              </div>
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  value={template}
                  onChange={setTemplate}
                  language="html"
                  placeholder="Enter your EJS template here..."
                />
              </div>
            </div>
          </Panel>

          <Separator className="w-1 bg-gray-200 transition-colors hover:bg-blue-400 active:bg-blue-500 dark:bg-gray-800 dark:hover:bg-blue-600 dark:active:bg-blue-700" />

          {/* JSON Data Panel */}
          <Panel defaultSize={33} minSize={20}>
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-800 dark:bg-gray-800">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  JSON Data
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Provide data for your template variables
                </p>
              </div>
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  value={data}
                  onChange={setData}
                  language="json"
                  placeholder='{"key": "value"}'
                />
              </div>
            </div>
          </Panel>

          <Separator className="w-1 bg-gray-200 transition-colors hover:bg-blue-400 active:bg-blue-500 dark:bg-gray-800 dark:hover:bg-blue-600 dark:active:bg-blue-700" />

          {/* Preview Panel */}
          <Panel defaultSize={34} minSize={20}>
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-800 dark:bg-gray-800">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Live Preview
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Real-time rendered output
                </p>
              </div>
              <div className="flex-1 overflow-hidden">
                <PreviewPanel html={rendered} isLoading={isLoading} />
              </div>
            </div>
          </Panel>
        </Group>
      </div>

      {/* Error Display */}
      <ErrorDisplay
        error={error?.message || null}
        details={error?.details}
        onClose={() => setError(null)}
      />
    </div>
  );
}
