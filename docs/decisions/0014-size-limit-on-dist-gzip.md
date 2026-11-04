# 0014. Size budget measured on the built `dist` files, gzipped

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #4

## Context

The plan sets a budget: the always-loaded loader under 5 kB and the whole
package under 25 kB, both gzipped. The question is what exactly gets measured.

## Options considered

| Option                                                   | Pros                                                                    | Cons                                            |
| -------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- |
| `@size-limit/file` on `dist/*.js`, gzip                  | Measures the exact files users download; same compression as the budget | Needs a build before measuring                  |
| `@size-limit/preset-small-lib` (re-bundles with esbuild) | No separate build step                                                  | Numbers differ from the real Vite output        |
| `dist` files, brotli                                     | Smaller numbers; jsDelivr serves brotli                                 | Not comparable with the gzip budget in the plan |

## Decision

`size-limit` with `@size-limit/file` checks `dist/loader.js` ≤ 5 kB and
all `dist/*.js` together ≤ 25 kB, gzipped. CI fails when either is exceeded.

## Why

The budget is a promise about what a host page downloads, so the measurement
must be of the real shipped files.

## Consequences and limitations

- `pnpm size` requires `pnpm build` first.
- Real-world transfer size can be smaller when the CDN serves brotli.
