import { useEffect, useState } from "react";
import { ClipboardCopy } from "lucide-react";
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
        <div className="flex justify-center mt-4">
          <FormButton
            className="btn-warning"
            type="reset"
            onClick={handleReset}
          >
            Reset
          </FormButton>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center">
        <div className="w-full bg-base-300 rounded-lg p-6 relative">
          <h3 className="text-lg font-semibold mb-4">Command</h3>
          <pre className="whitespace-pre-wrap break-all text-sm bg-base-100 p-4 rounded">
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
      </div>
    </div>
  );
};

export default ProjectConfigForm;
