# 0012. Skip WebKit E2E locally on macOS 14 and older

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #3

## Context

Playwright 1.64 no longer ships an up-to-date WebKit build for macOS 14
(Darwin 23). The frozen build it downloads fails to open a page
(`Unknown setting: PushAPIEnabled`). Chromium and Firefox work. WebKit on
Linux, which CI uses, is unaffected.

## Options considered

| Option                                                     | Pros                                                | Cons                                      |
| ---------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------- |
| Skip WebKit locally on macOS ≤ 14, always run it in CI     | No extra tools; `pnpm test:e2e` stays green locally | Safari-engine bugs only show up in CI     |
| Run WebKit locally in the official Playwright Docker image | Full local coverage                                 | Requires Docker Desktop and a ~2 GB image |
| Upgrade macOS                                              | Fixes it at the source                              | Outside the project's control             |

## Decision

`playwright.config.ts` drops the `webkit` project when running locally on
macOS 14 or older and prints a warning. CI always runs Chromium, Firefox
and WebKit.

## Why

CI is the cross-browser guarantee anyway (ADR 0009); this keeps local runs
working without adding Docker to the setup.

## Consequences and limitations

- WebKit failures are seen in CI, not locally, on older macOS.
- On macOS 15+ the WebKit project runs locally again with no change.
