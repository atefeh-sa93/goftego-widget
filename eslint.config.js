import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { configs as litConfigs } from 'eslint-plugin-lit';
import { configs as wcConfigs } from 'eslint-plugin-wc';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'playwright-report', 'test-results', 'docs/design'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  wcConfigs['flat/recommended'],
  litConfigs['flat/recommended'],
  {
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    files: ['scripts/**', '*.config.*'],
    languageOptions: { globals: { ...globals.node } },
  },
  prettier,
);
