import { FileCode } from "lucide-react";
import { useStore } from "../store";

export function ViteConfigDisplay() {
  const { viteConfigContent } = useStore();

  return (
    <div className="w-full bg-base-300 rounded-lg p-6 relative">
      <div className="flex items-center gap-2 mb-4">
        <FileCode size={20} />
        <h3 className="text-lg font-semibold">vite.config.ts Preview</h3>
      </div>
      <pre className="whitespace-pre-wrap break-all text-sm bg-base-100 p-4 rounded max-h-64 overflow-y-auto">
        {viteConfigContent}
      </pre>
    </div>
  );
}