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
    await projectConfigPage.assertCommandContains("npx create-vite my-project --template react-ts");
    
    await projectConfigPage.assertPackageJsonContains('"name": "my-project"');
    await projectConfigPage.assertPackageJsonContains('"@vitejs/plugin-react": "^4.3.4"');

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
    await projectConfigPage.assertCommandContains("npx create-vite my-project --template react-ts");
  });

  test("command string updates correctly when inputs change", async ({
    page,
  }) => {
    const projectConfigPage = new ProjectConfigPage(page);
    await projectConfigPage.goto();

    await projectConfigPage.fillProjectName("my-custom-app");
    await projectConfigPage.assertCommandContains("npx create-vite my-custom-app --template react-ts");
    await projectConfigPage.assertPackageJsonContains('"name": "my-custom-app"');

    await projectConfigPage.selectBundler("swc");
    await projectConfigPage.assertCommandContains("npx create-vite my-custom-app --template react-swc-ts");
    await projectConfigPage.assertPackageJsonContains('"@vitejs/plugin-react-swc": "^3.8.0"');
    
    await projectConfigPage.assertProjectNameValue("my-custom-app");
    await projectConfigPage.assertBundlerValue("swc");
  });
});