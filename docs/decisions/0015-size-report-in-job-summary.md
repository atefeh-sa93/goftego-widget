# 0015. Size report in the CI job summary, no PR comment bot

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #4

## Context

Bundle sizes should be visible on every run, not only when the budget fails.

## Options considered

| Option                                          | Pros                                              | Cons                                                        |
| ----------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------- |
| Table in the GitHub Actions job summary         | No third-party action, no write permission on PRs | No automatic comparison with `main`                         |
| PR comment with size diff (`size-limit-action`) | Shows the change against `main` on every PR       | Third-party action with write access; extra build of `main` |
| Only fail CI when over budget                   | Simplest                                          | Numbers hidden in logs                                      |

## Decision

A small script (`scripts/size-summary.mjs`) runs size-limit, writes a table
of each entry's size, limit and status to `$GITHUB_STEP_SUMMARY`, and fails
when an entry is over budget.

## Why

Visibility without granting a third-party action write access to the repository.

## Consequences and limitations

- Comparing with `main` means opening the previous run's summary by hand.
