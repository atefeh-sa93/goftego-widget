# 0008. Unit tests in Vitest browser mode with the Playwright provider

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #3

## Context

Custom elements, Shadow DOM, constructable stylesheets and focus behaviour
are not faithfully emulated by jsdom or happy-dom. Unit tests have to run in
a real browser. Vitest browser mode needs a provider to drive that browser.

## Options considered

| Option      | Pros                                                                         | Cons                                                         |
| ----------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Playwright  | Same tool as the E2E suite: one browser install, all three engines available | Browser downloads are large                                  |
| WebdriverIO | Can use browsers already installed on the machine                            | A second tool next to Playwright; no real WebKit on Linux CI |

## Decision

Use Vitest browser mode with `@vitest/browser-playwright`.

## Why

One browser automation tool for both unit and E2E tests keeps setup and CI
simple, and keeps the option of running unit tests on more engines later.

## Consequences and limitations

- Contributors run `pnpm exec playwright install` once.
