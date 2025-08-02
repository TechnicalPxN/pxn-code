import { create } from 'zustand';

type CodeEditorStore = {
  language: string;
  code: string;
  output: string;
  fontSize: number;
  theme: string;
  editor: any; // or a proper type like MonacoEditor if you have it
  setLanguage: (lang: string) => void;
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setFontSize: (size: number) => void;
  setTheme: (theme: string) => void;
  setEditor: (editor: any) => void;
};

export const useCodeEditorStore = create<CodeEditorStore>((set) => ({
  language: 'javascript',
  code: '',
  output: '',
  fontSize: 14,
  theme: 'vs-dark',
  editor: null,
  setLanguage: (lang) => set({ language: lang }),
  setCode: (code) => set({ code }),
  setOutput: (output) => set({ output }),
  setFontSize: (size) => set({ fontSize: size }),
  setTheme: (theme) => set({ theme }),
  setEditor: (editor) => set({ editor }),
}));

export const getExecutionResult = () => {
  const { code, language } = useCodeEditorStore.getState();
  return `Code: ${code}, Language: ${language}`;
};
