import { expect, Locator, Page } from "@playwright/test";

export class ProjectConfigPage {
  readonly page: Page;
  readonly projectNameInput: Locator;
  readonly bundlerSelect: Locator;
  readonly commandPreElement: Locator;
  readonly viteConfigPreElement: Locator; // New locator for vite config
  readonly resetButton: Locator;
  readonly copyButton: Locator;
  readonly copySuccessToast: Locator;
  readonly projectConfigHeader: Locator;
  readonly packageJsonPreview: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectNameInput = page.locator('input[name="projectName"]');
    this.bundlerSelect = page.locator('select[name="bundler"]');
    this.projectConfigHeader = page.locator("h2:has-text('Project Configuration')");
    this.commandPreElement = page.locator("pre").first();
    this.packageJsonPreview = page.locator("pre").nth(1); // Package.json would be the second pre
    this.viteConfigPreElement = page.locator("pre").nth(2); // Vite config would be the third pre
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.copyButton = page.getByRole("button", { name: /Copy to Clipboard/ });
    this.copySuccessToast = page.locator(".toast .alert-success");
  }

  async goto() {
    await this.page.goto("/");
  }

  async fillProjectName(projectName: string) {
    await this.projectNameInput.fill(projectName);
  }

  async selectBundler(bundler: string) {
    await this.bundlerSelect.selectOption({ value: bundler });
  }

  async clickResetButton() {
    await this.resetButton.click();
  }

  async clickCopyButton() {
    await this.copyButton.click();
  }

  async assertProjectNameValue(expectedValue: string) {
    await expect(this.projectNameInput).toHaveValue(expectedValue);
  }

  async assertBundlerValue(expectedValue: string) {
    await expect(this.bundlerSelect).toHaveValue(expectedValue);
  }

  async assertProjectConfigVisible() {
    await expect(this.projectConfigHeader).toBeVisible();
    await expect(this.projectConfigHeader).toHaveText("Project Configuration");
  }

  async assertCommandContains(expectedSnippet: string) {
    await expect(this.commandPreElement).toContainText(expectedSnippet);
  }

  async assertPackageJsonContains(expectedSnippet: string) {
    await expect(this.packageJsonPreview).toContainText(expectedSnippet);
  }

  async assertPackageJsonNotContains(unexpectedSnippet: string) {
    await expect(this.packageJsonPreview).not.toContainText(unexpectedSnippet);
  }

  async assertViteConfigContains(expectedSnippet: string) {
    await expect(this.viteConfigPreElement).toContainText(expectedSnippet);
  }

  async assertViteConfigNotContains(unexpectedSnippet: string) {
    await expect(this.viteConfigPreElement).not.toContainText(unexpectedSnippet);
  }

  async assertCopySuccessVisible() {
    await expect(this.copySuccessToast).toBeVisible();
    await expect(this.copySuccessToast).toContainText("Copied to clipboard!");
  }
}