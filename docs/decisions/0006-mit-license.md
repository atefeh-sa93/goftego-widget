# 0006. MIT license

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #2

## Context

The package is published to npm and meant to be embedded in third-party
sites, so the license must be permissive and familiar.

## Options considered

| Option     | Pros                                        | Cons                                          |
| ---------- | ------------------------------------------- | --------------------------------------------- |
| MIT        | Simplest, most common for frontend packages | No explicit patent grant                      |
| Apache-2.0 | Explicit patent protection                  | Longer text; rarely needed for a small widget |

## Decision

License the project under MIT.

## Why

It is what users of frontend packages expect, and it is compatible with
Lit's BSD-3-Clause license.

## Consequences and limitations

No explicit patent grant.
