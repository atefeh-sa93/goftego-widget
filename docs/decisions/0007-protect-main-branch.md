# 0007. Protect `main` with a repository ruleset

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #31, follow-up in #4

## Context

Every task goes through issue → branch → PR → squash merge. Without
protection, anyone with write access could push to `main` directly,
force-push over its history or delete it. This is a solo project, so a
rule that needs a second person's review would block every merge.

## Options considered

| Option                                                                                           | Pros                                   | Cons                                                                           |
| ------------------------------------------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------ |
| Ruleset now (no deletion, no force-push, PR required, 0 approvals); add required CI checks in #4 | Workflow is enforced from the first PR | Two steps instead of one                                                       |
| Wait and configure everything in #4                                                              | One step                               | `main` is unprotected until CI exists                                          |
| Require 1 approval                                                                               | Classic team setup                     | GitHub does not let authors approve their own PRs, so nothing could ever merge |

## Decision

A ruleset named **Protect main** on the default branch:

- block deletion
- block force-push (non-fast-forward)
- require a pull request, with 0 required approvals and squash as the only merge method
- no bypass actors, so the rules apply to the repository owner too

Required status checks are added once CI exists (#4).

## Why

The rules enforce the workflow this project already follows from the first
merge, without a review requirement that one person cannot satisfy.

## Consequences and limitations

- Every change, including docs and small fixes, needs a PR.
- Until #4, a PR can be merged without CI passing; local checks are the only gate.
