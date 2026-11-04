# 0013. CI as parallel jobs, E2E split per browser

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #4

## Context

CI runs lint, typecheck, unit tests, build, the size budget and E2E on three
engines on every push and pull request. These can run in one sequential job
or as separate jobs.

## Options considered

| Option                                                               | Pros                                                                                                     | Cons                                             |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Parallel jobs: lint + typecheck, unit, build + size, E2E per browser | Faster; each failure has its own named check (e.g. `E2E (webkit)`); one failure does not hide the others | Longer YAML; dependencies installed in every job |
| One sequential job (the plan's example)                              | Short and simple                                                                                         | Slower; stops at the first failing step          |

## Decision

Four kinds of jobs run in parallel: `Lint & typecheck`, `Unit tests`,
`Build & size`, and `E2E (chromium|firefox|webkit)` as a matrix with
`fail-fast: false`. Each E2E job installs only its own browser.

## Why

Named, independent checks make a red PR easy to read and are what the
branch ruleset requires before merging.

## Consequences and limitations

- `pnpm install` runs in every job (cached by `actions/setup-node`).
- Runner minutes are free for public repositories, so the extra jobs cost nothing.
