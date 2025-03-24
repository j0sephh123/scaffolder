import { ClipboardCopy, Terminal } from "lucide-react";
import { useStore } from "../store";
import FormButton from "./FormButton";

export function CommandDisplay() {
  const { commandString, copySuccess, copyToClipboard } = useStore();

  return (
    <div className="w-full bg-base-300 rounded-lg p-6 relative mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Terminal size={20} />
        <h3 className="text-lg font-semibold">Command</h3>
      </div>
      <pre className="whitespace-pre-wrap break-all text-sm bg-base-100 p-4 rounded max-h-64 overflow-y-auto">
        {commandString}
      </pre>
      <FormButton onClick={copyToClipboard} className="btn-primary mt-4 w-full">
        <ClipboardCopy size={16} className="mr-2" />
        Copy to Clipboard
      </FormButton>
      {copySuccess && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}
