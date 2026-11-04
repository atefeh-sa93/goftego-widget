import { release } from 'node:os';
import { defineConfig, devices, type Project } from '@playwright/test';

const CI = !!process.env['CI'];

// Playwright no longer ships a working WebKit for macOS 14 (Darwin 23) or older,
// so WebKit is skipped there locally. CI (Linux) always runs all three engines (ADR 0012).
const oldMac = process.platform === 'darwin' && Number(release().split('.')[0]) < 24;
const skipWebkit = !CI && oldMac;
if (skipWebkit) {
  console.warn(
    '[e2e] Skipping WebKit: not supported by Playwright on macOS 14 or older. CI runs it.',
  );
}

const projects: Project[] = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
];

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:5317',
    trace: 'on-first-retry',
  },
  // E2E runs on all three engines (ADR 0009)
  projects: skipWebkit ? projects.filter((p) => p.name !== 'webkit') : projects,
  // Dedicated port so a dev server from another project is never reused by mistake
  webServer: {
    command: 'pnpm dev --port 5317 --strictPort',
    url: 'http://localhost:5317/plain/',
    reuseExistingServer: !CI,
  },
});
