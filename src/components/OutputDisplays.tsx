import { CommandDisplay } from "./CommandDisplay";
import { PackageJsonDisplay } from "./PackageJsonDisplay";
import { ViteConfigDisplay } from "./ViteConfigDisplay";

export function OutputDisplays() {
  return (
    <>
      <CommandDisplay />
      <PackageJsonDisplay />
      <ViteConfigDisplay />
    </>
  );
}
