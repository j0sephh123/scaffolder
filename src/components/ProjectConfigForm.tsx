import { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { useStore } from "../store";
import { DEFAULT_PROJECT_NAME } from "../constants";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const bundlerOptions = [
  { value: "esbuild", label: "esbuild" },
  { value: "swc", label: "swc" },
];

export function ProjectConfigForm() {
  const {
    projectName,
    bundler,
    updateProjectName,
    updateBundler,
    generateCommand,
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
    <div className="bg-base-200 rounded-lg shadow-xl p-6">
      <div className="flex justify-end">
        <FormButton onClick={handleReset}>
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
  );
}
