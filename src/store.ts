import { create } from "zustand";
import { DEFAULT_PROJECT_NAME } from "./constants";

type FormState = {
  projectName: string;
  bundler: "esbuild" | "swc";
  commandString: string;
  copySuccess: boolean;
  updateProjectName: (name: string) => void;
  updateBundler: (bundler: "esbuild" | "swc") => void;
  generateCommand: () => void;
  setCopySuccess: (status: boolean) => void;
  copyToClipboard: () => void;
};

export const useStore = create<FormState>((set, get) => ({
  projectName: DEFAULT_PROJECT_NAME,
  bundler: "esbuild",
  commandString: "",
  copySuccess: false,

  updateProjectName: (name) => set({ projectName: name }),

  updateBundler: (bundler) => set({ bundler }),

  generateCommand: () => {
    const { projectName, bundler } = get();
    const template = bundler === "swc" ? "react-swc-ts" : "react-ts";

    const command = `npx create-vite ${projectName} --template ${template}`;

    set({ commandString: command });
  },

  setCopySuccess: (status) => set({ copySuccess: status }),

  copyToClipboard: () => {
    const { commandString } = get();
    navigator.clipboard.writeText(commandString);
    set({ copySuccess: true });
    setTimeout(() => set({ copySuccess: false }), 2000);
  },
}));
