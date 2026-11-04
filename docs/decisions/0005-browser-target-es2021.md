# 0005. Build target ES2021 (same as Lit 3)

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #2

## Context

The widget runs on other people's sites, so its browser support is part of
the public contract. The build target decides which syntax is shipped as-is
and which browsers can run it without polyfills.

## Options considered

| Option | Pros                                     | Cons                                     |
| ------ | ---------------------------------------- | ---------------------------------------- |
| ES2021 | Matches Lit 3's own target; no polyfills | Drops browsers older than the list below |
| ES2022 | Slightly smaller, more modern output     | Also drops Safari below 15.4             |

## Decision

Compile to ES2021, both in TypeScript and in the Vite build.

## Why

Shipping a newer target than Lit itself would narrow browser support with
almost no size gain.

## Consequences and limitations

Supported without polyfills: Chrome / Edge 85+, Firefox 79+, Safari 14.1+.
Older browsers are not supported; this is listed in the README
**Browser support** section.
