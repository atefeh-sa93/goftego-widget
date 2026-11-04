# 0011. 80% coverage threshold enforced in CI

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #3

## Context

Coverage can be ignored, reported only, or enforced with a threshold that
fails the build.

## Options considered

| Option        | Pros                                                            | Cons                                     |
| ------------- | --------------------------------------------------------------- | ---------------------------------------- |
| Report only   | Focus on meaningful tests, not a number                         | Nothing stops coverage from dropping     |
| 80% threshold | A visible, enforced quality bar; a number to show in the README | Risk of spending time on low-value tests |
| No coverage   | Simplest                                                        | No signal at all                         |

## Decision

`pnpm test` collects V8 coverage for `src/**` and fails below 80% for
statements, branches, functions and lines.

## Why

An enforced bar keeps the public API honest as features land, and gives a
real number for the README.

## Consequences and limitations

- V8 coverage only works in Chromium, which matches ADR 0009.
- Type-only files (`src/types/**`) are excluded, as they contain no runtime code.
- Tests are written for behaviour first; the threshold is a floor, not the goal.
