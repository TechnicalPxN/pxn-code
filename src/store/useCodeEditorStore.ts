// src/store/useCodeEditorStore.ts
import { create } from "zustand";
import type { editor as MonacoEditor } from "monaco-editor";

type CodeEditorStore = {
  editor: MonacoEditor.IStandaloneCodeEditor | null;
  setEditor: (editor: MonacoEditor.IStandaloneCodeEditor) => void;
  language: string;
  theme: string;
  fontSize: number;
  setFontSize: (size: number) => void;
};

export const useCodeEditorStore = create<CodeEditorStore>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
  language: "javascript",
  theme: "vs-dark",
  fontSize: 14,
  setFontSize: (size) => set({ fontSize: size }),
}));
