import { useEffect, useState } from "react";
import { ClipboardCopy, Package, RefreshCcw, Terminal } from "lucide-react";
import { useStore } from "./store";
import { DEFAULT_PROJECT_NAME } from "./constants";
import FormButton from "./components/FormButton";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";

const bundlerOptions = [
  { value: "esbuild", label: "esbuild" },
  { value: "swc", label: "swc" },
];

const ProjectConfigForm = () => {
  const {
    projectName,
    bundler,
    commandString,
    copySuccess,
    packageJsonContent,
    updateProjectName,
    updateBundler,
    generateCommand,
    copyToClipboard,
  } = useStore();

  const [errors, setErrors] = useState<{
    projectName?: string;
  }>({});

  useEffect(() => {
    generateCommand();
  }, [projectName, bundler, generateCommand]);

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateProjectName(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        projectName: "Project name is required",
      }));
    } else {
      setErrors((prev) => ({ ...prev, projectName: undefined }));
    }
  };

  const handleBundlerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateBundler(e.target.value as "esbuild" | "swc");
  };

  const handleReset = () => {
    updateProjectName(DEFAULT_PROJECT_NAME);
    updateBundler("esbuild");
    setErrors({});
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto p-4">
      <div className="w-full md:w-1/2 bg-base-200 rounded-lg shadow-xl p-6">
        <div className="flex justify-end">
          <FormButton
            onClick={handleReset}
          >
            <RefreshCcw size={16} className="mr-2" />
            Reset
          </FormButton>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Project Configuration
        </h2>

        <form className="space-y-4">
          <FormInput
            label="Project Name"
            name="projectName"
            value={projectName}
            onChange={handleProjectNameChange}
            error={errors.projectName}
            required
          />

          <FormSelect
            label="Bundler"
            name="bundler"
            value={bundler}
            options={bundlerOptions}
            onChange={handleBundlerChange}
          />
        </form>
      </div>

      <div className="w-full md:w-1/2">
        <div className="w-full bg-base-300 rounded-lg p-6 relative mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={20} />
            <h3 className="text-lg font-semibold">Command</h3>
          </div>
          <pre className="whitespace-pre-wrap break-all text-sm bg-base-100 p-4 rounded max-h-64 overflow-y-auto">
            {commandString}
          </pre>
          <FormButton
            onClick={copyToClipboard}
            className="btn-primary mt-4 w-full"
          >
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

        <div className="w-full bg-base-300 rounded-lg p-6 relative">
          <div className="flex items-center gap-2 mb-4">
            <Package size={20} />
            <h3 className="text-lg font-semibold">package.json Preview</h3>
          </div>
          <pre className="whitespace-pre-wrap break-all text-sm bg-base-100 p-4 rounded max-h-64 overflow-y-auto">
            {packageJsonContent}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProjectConfigForm;
