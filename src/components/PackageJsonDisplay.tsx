import { Package } from "lucide-react";
import { useStore } from "../store";

export function PackageJsonDisplay() {
  const { packageJsonContent } = useStore();

  return (
    <div className="w-full bg-base-300 rounded-lg p-6 relative mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Package size={20} />
        <h3 className="text-lg font-semibold">package.json Preview</h3>
      </div>
      <pre className="whitespace-pre-wrap break-all text-sm bg-base-100 p-4 rounded max-h-64 overflow-y-auto">
        {packageJsonContent}
      </pre>
    </div>
  );
}