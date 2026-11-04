# 0009. Unit tests on Chromium only; E2E on Chromium, Firefox and WebKit

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #3

## Context

The widget runs on other people's sites, so it must work in every major
engine. Running every test on every engine multiplies CI time.

## Options considered

| Option                             | Pros                                                              | Cons                                                              |
| ---------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| Unit and E2E on all three engines  | Engine-specific bugs show up in the fastest feedback loop         | CI roughly 2–3× slower                                            |
| Unit on Chromium, E2E on all three | Fast unit runs; cross-engine behaviour is still proven end to end | Engine-specific bugs surface later, in E2E rather than unit tests |

## Decision

Unit tests (Vitest browser mode) run on Chromium. The Playwright E2E suite
runs on Chromium, Firefox and WebKit.

## Why

Unit tests stay fast while the E2E suite, which exercises the real demos,
remains the cross-browser guarantee.

## Consequences and limitations

- A Firefox- or WebKit-only bug in a single unit (e.g. the focus trap) is caught
  by E2E, not by unit tests. If that happens, the affected unit tests can be
  given extra browser instances without changing this decision for the rest.
- Coverage uses V8, which is only available in Chromium (see ADR 0011).
