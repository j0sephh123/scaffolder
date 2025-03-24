import { create } from "zustand";
import { DEFAULT_PROJECT_NAME } from "./constants";

type FormState = {
  projectName: string;
  bundler: "esbuild" | "swc";
  commandString: string;
  copySuccess: boolean;
  viteConfigContent: string;
  updateProjectName: (name: string) => void;
  updateBundler: (bundler: "esbuild" | "swc") => void;
  generateCommand: () => void;
  setCopySuccess: (status: boolean) => void;
  copyToClipboard: () => void;
  generatePackageJson: () => string;
  generateViteConfig: () => string;
  packageJsonContent: string;
};

type DevDependencies = {
  "@eslint/js": string;
  "@types/react": string;
  "@types/react-dom": string;
  "@vitejs/plugin-react": string | null;
  "@vitejs/plugin-react-swc": string | null;
  eslint: string;
  "eslint-plugin-react-hooks": string;
  "eslint-plugin-react-refresh": string;
  globals: string;
  typescript: string;
  "typescript-eslint": string;
  vite: string;
};

export const useStore = create<FormState>((set, get) => ({
  projectName: DEFAULT_PROJECT_NAME,
  bundler: "esbuild",
  commandString: "",
  packageJsonContent: "",
  viteConfigContent: "",
  copySuccess: false,

  updateProjectName: (name) => set({ projectName: name }),

  updateBundler: (bundler) => set({ bundler }),

  generateCommand: () => {
    const { projectName, bundler } = get();
    const template = bundler === "swc" ? "react-swc-ts" : "react-ts";
    const packageJsonContent = get().generatePackageJson();
    const viteConfigContent = get().generateViteConfig();

    const packageJsonDelimiter =
      "EOF_PACKAGE_JSON_" + Math.random().toString(36).substring(2, 10);

    const viteConfigDelimiter =
      "EOF_VITE_CONFIG_" + Math.random().toString(36).substring(2, 10);

    const commands = [
      `#!/bin/bash`,
      `set -e # Exit on error`,
      ``,
      `echo "Creating ${projectName} project with ${bundler} bundler..."`,
      `npx create-vite ${projectName} --template ${template}`,
      ``,
      `echo "Updating package.json..."`,
      `cd ${projectName}`,
      `cat > package.json << '${packageJsonDelimiter}'`,
      packageJsonContent,
      packageJsonDelimiter,
      ``,
      `echo "Updating vite.config.ts..."`,
      `cat > vite.config.ts << '${viteConfigDelimiter}'`,
      viteConfigContent,
      viteConfigDelimiter,
      ``,
      `echo "cd ${projectName}"`,
    ].join("\n");

    set({
      commandString: commands,
      packageJsonContent: packageJsonContent,
      viteConfigContent: viteConfigContent,
    });
  },

  generatePackageJson: () => {
    const { projectName, bundler } = get();

    const packageJson = {
      name: projectName,
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc -b && vite build",
        lint: "eslint .",
        preview: "vite preview",
      },
      dependencies: {
        react: "^19.0.0",
        "react-dom": "^19.0.0",
      },
      devDependencies: {
        "@eslint/js": "^9.21.0",
        "@types/react": "^19.0.10",
        "@types/react-dom": "^19.0.4",
        "@vitejs/plugin-react": bundler === "esbuild" ? "^4.3.4" : null,
        "@vitejs/plugin-react-swc": bundler === "swc" ? "^3.8.0" : null,
        eslint: "^9.21.0",
        "eslint-plugin-react-hooks": "^5.1.0",
        "eslint-plugin-react-refresh": "^0.4.19",
        globals: "^15.15.0",
        typescript: "~5.7.2",
        "typescript-eslint": "^8.24.1",
        vite: "^6.2.0",
      } as DevDependencies,
    };

    // Create a properly typed cleaned version of devDependencies
    const cleanedDevDependencies = Object.fromEntries(
      Object.entries(packageJson.devDependencies).filter(
        ([, value]) => value !== null
      )
    ) as DevDependencies;

    packageJson.devDependencies = cleanedDevDependencies;

    return JSON.stringify(packageJson, null, 2);
  },

  generateViteConfig: () => {
    const { bundler } = get();

    if (bundler === "swc") {
      return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})`;
    } else {
      return `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});`;
    }
  },

  setCopySuccess: (status) => set({ copySuccess: status }),

  copyToClipboard: () => {
    const { commandString } = get();
    navigator.clipboard.writeText(commandString);
    set({ copySuccess: true });
    setTimeout(() => set({ copySuccess: false }), 2000);
  },
}));
