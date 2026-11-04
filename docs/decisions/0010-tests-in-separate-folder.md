# 0010. Tests live in `tests/`, not next to the source

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #3

## Context

Test files can sit next to the code they test (`*.test.ts` in `src/`) or in
a separate folder.

## Options considered

| Option                       | Pros                                                                | Cons                                                              |
| ---------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `tests/unit` and `tests/e2e` | Matches the project plan; shipped code and tests are fully separate | Switching between two folders                                     |
| Co-located `*.test.ts`       | Test is next to the file it covers                                  | Differs from the plan; must make sure tests never reach the build |

## Decision

Unit tests in `tests/unit/**/*.test.ts`, E2E tests in `tests/e2e/**/*.spec.ts`.

## Why

`src/` contains only code that is published, which keeps the package build
and the size budget easy to reason about.

## Consequences and limitations

- Imports in tests use relative paths into `src/`.
