import { test } from "@playwright/test";
import { ProjectConfigPage } from "./ProjectConfigPage";

test.describe("Project Configuration", () => {
  test("initial state should be correct", async ({ page }) => {
    const projectConfigPage = new ProjectConfigPage(page);
    await projectConfigPage.goto();

    await projectConfigPage.assertProjectConfigVisible();
    await projectConfigPage.assertProjectNameValue("my-project");
    await projectConfigPage.assertBundlerValue("esbuild");

    await projectConfigPage.assertCommandContains("#!/bin/bash");
    await projectConfigPage.assertCommandContains(
      "npx create-vite my-project --template react-ts"
    );

    await projectConfigPage.assertPackageJsonContains('"name": "my-project"');
    await projectConfigPage.assertPackageJsonContains(
      '"@vitejs/plugin-react": "^4.3.4"'
    );

    await projectConfigPage.clickCopyButton();
    await projectConfigPage.assertCopySuccessVisible();
  });

  test("reset button restores default values", async ({ page }) => {
    const projectConfigPage = new ProjectConfigPage(page);
    await projectConfigPage.goto();

    await projectConfigPage.fillProjectName("test-app");
    await projectConfigPage.selectBundler("swc");
    await projectConfigPage.assertProjectNameValue("test-app");
    await projectConfigPage.assertBundlerValue("swc");

    await projectConfigPage.clickResetButton();

    await projectConfigPage.assertProjectNameValue("my-project");
    await projectConfigPage.assertBundlerValue("esbuild");
    await projectConfigPage.assertCommandContains(
      "npx create-vite my-project --template react-ts"
    );
  });
});

test.describe("Bundler Package.json Output", () => {
  test("esbuild should generate correct package.json", async ({ page }) => {
    const projectConfigPage = new ProjectConfigPage(page);
    await projectConfigPage.goto();

    await projectConfigPage.fillProjectName("esbuild-project");
    await projectConfigPage.selectBundler("esbuild");

    await projectConfigPage.assertCommandContains(
      "npx create-vite esbuild-project --template react-ts"
    );

    await projectConfigPage.assertPackageJsonContains(
      '"name": "esbuild-project"'
    );
    await projectConfigPage.assertPackageJsonContains(
      '"@vitejs/plugin-react": "^4.3.4"'
    );
    await projectConfigPage.assertPackageJsonNotContains(
      '"@vitejs/plugin-react-swc"'
    );
  });

  test("swc should generate correct package.json", async ({ page }) => {
    const projectConfigPage = new ProjectConfigPage(page);
    await projectConfigPage.goto();

    await projectConfigPage.fillProjectName("swc-project");
    await projectConfigPage.selectBundler("swc");

    await projectConfigPage.assertCommandContains(
      "npx create-vite swc-project --template react-swc-ts"
    );

    await projectConfigPage.assertPackageJsonContains('"name": "swc-project"');
    await projectConfigPage.assertPackageJsonContains(
      '"@vitejs/plugin-react-swc": "^3.8.0"'
    );
    await projectConfigPage.assertPackageJsonNotContains(
      '"@vitejs/plugin-react"'
    );
  });
});

test.describe("Bundler Configuration Files", () => {
  test("esbuild should generate correct vite.config.ts", async ({ page }) => {
    const projectConfigPage = new ProjectConfigPage(page);
    await projectConfigPage.goto();

    await projectConfigPage.fillProjectName("esbuild-project");
    await projectConfigPage.selectBundler("esbuild");

    // Check package.json
    await projectConfigPage.assertPackageJsonContains(
      '"@vitejs/plugin-react": "^4.3.4"'
    );
    await projectConfigPage.assertPackageJsonNotContains(
      '"@vitejs/plugin-react-swc"'
    );

    // Check vite.config.ts content
    const expectedEsbuildConfig = `import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  
  export default defineConfig({
    plugins: [react()],
  });`;

    await projectConfigPage.assertViteConfigContains(expectedEsbuildConfig);
    await projectConfigPage.assertCommandContains("cat > vite.config.ts");
  });

  test("swc should generate correct vite.config.ts", async ({ page }) => {
    const projectConfigPage = new ProjectConfigPage(page);
    await projectConfigPage.goto();

    await projectConfigPage.fillProjectName("swc-project");
    await projectConfigPage.selectBundler("swc");

    // Check package.json
    await projectConfigPage.assertPackageJsonContains(
      '"@vitejs/plugin-react-swc": "^3.8.0"'
    );
    await projectConfigPage.assertPackageJsonNotContains(
      '"@vitejs/plugin-react"'
    );

    // Check vite.config.ts content
    const expectedSwcConfig = `import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'
  
  export default defineConfig({
    plugins: [react()],
  })`;

    await projectConfigPage.assertViteConfigContains(expectedSwcConfig);
    await projectConfigPage.assertCommandContains("cat > vite.config.ts");
  });
});
