# 0016. Pin GitHub Actions to commit SHAs, updated by Dependabot

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #4

## Context

Workflows run third-party actions with access to the repository token. A
version tag such as `@v4` can be moved by the action's owner, or by an
attacker who compromises it, to point at different code.

## Options considered

| Option                                                    | Pros                                                                         | Cons                                |
| --------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------- |
| Full commit SHA + version comment, Dependabot for updates | Immutable; GitHub's own security recommendation; updates still arrive as PRs | Less readable YAML                  |
| Version tag (`@v4`)                                       | Readable, common                                                             | Tags are mutable; supply-chain risk |

## Decision

Every `uses:` is pinned to a full commit SHA with the version as a comment,
and `.github/dependabot.yml` opens monthly PRs for GitHub Actions updates.

## Why

The package is published to npm; its CI should not run code that can change
without a commit in this repository.

## Consequences and limitations

- Dependabot PRs need to be reviewed and merged like any other PR.
- Workflows also run with `permissions: contents: read` by default.
