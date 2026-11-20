import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

// Use the system Chromium when present (cloud sessions); otherwise Playwright's own.
const systemChromium = "/opt/pw-browsers/chromium";
const launchOptions = existsSync(systemChromium) ? { executablePath: systemChromium } : {};
const PORT = Number(process.env.PORT ?? 3100);

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 6_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    launchOptions,
    trace: "off",
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions } },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions } },
  ],
});
