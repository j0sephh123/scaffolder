import { OutputDisplays } from "./components/OutputDisplays";
import { ProjectConfigForm } from "./components/ProjectConfigForm";

export default function App() {
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto p-4">
      <div className="w-full md:w-1/3">
        <ProjectConfigForm />
      </div>

      <div className="w-full md:w-2/3">
        <OutputDisplays />
      </div>
    </div>
  );
}
