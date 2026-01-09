"use client";

import { useTheme } from "next-themes";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: "html" | "json";
  placeholder?: string;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language,
  placeholder = "",
  readOnly = false,
}: CodeEditorProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Determine the actual theme to use
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full bg-gray-50 dark:bg-gray-900 animate-pulse" />
    );
  }

  const extensions =
    language === "html" ? [html()] : [javascript({ jsx: false })];

  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={currentTheme === "dark" ? "dark" : "light"}
      extensions={extensions}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        searchKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
      className="h-full text-sm"
    />
  );
}
