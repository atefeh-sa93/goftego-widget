import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      // Unit tests on Chromium only; E2E covers Firefox and WebKit (ADR 0009)
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      // V8 coverage is Chromium-only, matching the unit test browser (ADR 0011)
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/types/**'],
      reporter: ['text', 'html', 'json-summary'],
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
    },
  },
});
