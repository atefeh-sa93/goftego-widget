# 0001. Record decisions as ADRs

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93

## Context

goftego-widget is an SDK with a public API (attributes, properties, events,
CSS variables, parts). Choices about that API, the stack and the trade-offs
behind them should be visible to anyone reading the repository, not hidden in
code or lost in chat history.

## Options considered

| Option                                          | Pros                                                | Cons                                            |
| ----------------------------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| ADR file per decision + PR section + README log | Permanent, reviewable, linkable from README and PRs | A bit more writing per task                     |
| PR description + README only                    | Lighter                                             | Reasoning is scattered across closed PRs        |
| Issue comments + README                         | Decided before code is written                      | Hard to find later, not versioned with the code |

## Decision

Every meaningful decision gets an ADR in `docs/decisions/`, is summarised in
the **Decisions** section of the pull request that implements it, and is
listed in the README **Decision log** table.

## Why

ADRs live next to the code, are versioned with it, and can be superseded
explicitly. The PR section ties the decision to the change; the README table
gives a one-screen overview.

## Consequences and limitations

- Each task starts with a short decision step before any code is written.
- Small, reversible implementation details do not need an ADR.
