import { create } from "zustand";

interface ExecutionResult {
  code: string;
  output?: string;
  error?: string;
}

interface CodeEditorStore {
    theme: string;
  setTheme: (theme: string) => void;

  fontSize: number;
  setFontSize: (size: number) => void;

  code: string;
  setCode: (code: string) => void;

  language: string;
  setLanguage: (language: string) => void;

  output: string;
  setOutput: (output: string) => void;

  error: string;
  setError: (error: string) => void;

  isRunning: boolean;
  setIsRunning: (running: boolean) => void;

  runCode: () => Promise<void>;

  editor: any;
  setEditor: (editorInstance: any) => void;

  getExecutionResult: () => ExecutionResult | null;
}

export const useCodeEditorStore = create<CodeEditorStore>((set, get) => ({
  code: "",
  setCode: (code) => set({ code }),

    theme: "vs-dark",
  setTheme: (theme) => set({ theme }),

  fontSize: 14,
  setFontSize: (size) => set({ fontSize: size }),

  language: "javascript",
  setLanguage: (language) => set({ language }),

  output: "",
  setOutput: (output) => set({ output }),

  error: "",
  setError: (error) => set({ error }),

  isRunning: false,
  setIsRunning: (running) => set({ isRunning: running }),

  editor: null,
  setEditor: (editorInstance) => set({ editor: editorInstance }),

  runCode: async () => {
    const { code, language, setIsRunning, setOutput, setError } = get();
    setIsRunning(true);
    setOutput("");
    setError("");

    try {
      // Replace with real code execution API
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      if (res.ok) {
        set({ output: data.output || "", error: data.error || "" });
      } else {
        set({ error: data.error || "Unknown error" });
      }
    } catch (err: any) {
      set({ error: err.message || "Execution failed" });
    } finally {
      setIsRunning(false);
    }
  },

  getExecutionResult: () => {
    const { code, output, error } = get();
    if (!code) return null;
    return { code, output, error };
  },
}));
